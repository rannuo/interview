import React, { useState, useRef, useEffect, ReactNode } from "react"

import {solidStr, chunkStr} from '../../utils';
import styles from './index.module.css';
import {IRedeemService} from "../../services/IRedeemService";
import {GiftInfo} from '../../model';
import {toast, unknownErrorToast} from '../../base/toast';
import {logError} from "../../base/logger";
import {Loading} from "../../views/Loading";

const CODE_SEGMENTS = 4;
const CODE_SEGMENT_LENGTH = 4;

type RedeemCode = string[];

/**
 * parse 粘贴过来的兑换码
 */
function parsePastedCode(str: string): RedeemCode {
    str = solidStr(str);
    str = str.replace(/-/g, '');
    return chunkStr(str, CODE_SEGMENT_LENGTH)
        .map(solidStr)
        .map(x => x.slice(0, CODE_SEGMENT_LENGTH))
        .slice(0, CODE_SEGMENTS);
}

/**
 * 校验兑换码，返回 string 代表错误，返回 null 代表没问题
 * @param code
 * @returns
 */
function validateCode(code: RedeemCode): string | null {
    if (code.map(solidStr).filter(x => x.length > 0).length < CODE_SEGMENTS) {
        return '兑换码不足四组，请检查'
    }
    for (const seg of code) {
        if (seg.length < CODE_SEGMENT_LENGTH) {
            return '有兑换码段不足四位，请检查'
        }
    }
    // TODO: luhn 算法，这个要看我们码的规则

    return null;
}


interface IProps {
    redeemService: IRedeemService;
    onVerifySucc: (giftInfo: GiftInfo, code: string) => void;
}

/**
 * 兑换码检验界面
 */
export function VerifyCodeView({redeemService, onVerifySucc}: IProps) {
    // 格式：aaaa-aaaa-aaaa-aaaa
    const [code, setCode] = useState<string[]>(() => Array(CODE_SEGMENTS).fill(''));
    const [error, setError] = useState<string | null>(null);
    const [dirty, setDirty] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const inputsRef = useRef(new Map<number, HTMLInputElement>());

    function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const codeValue = solidStr(e.target.value).slice(0, CODE_SEGMENTS);
        const newCode = code.slice();
        newCode[index] = codeValue;
        setCode(newCode);

        setDirty(true);

        // 自动跳转下一个
        if (codeValue.length === CODE_SEGMENT_LENGTH) {
            inputsRef.current.get(index + 1)?.focus();
        }
    }

    const inputLine: ReactNode[] = [];

    Array(CODE_SEGMENTS).fill(0).forEach((_, i) => {
        inputLine.push(
            <input
                className={styles.input}
                key={i} // 虽然用 index 当做 key 不太好，但是我们这个场景比较简单，所以暂时没什么问题
                ref={(node) => {
                    if (node) {
                        inputsRef.current.set(i, node)
                    } else {
                        inputsRef.current.delete(i);
                    }
                }}
                value={code[i]}
                onChange={(e) => handleCodeChange(e, i)}
            />
        );

        if (i !== CODE_SEGMENTS - 1) {
            inputLine.push(<span key={i+'-separator'}>-</span>)
        }
    });

    function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
        event.preventDefault();
        const pasteCode = (
            event.clipboardData ||
            // @ts-expect-error copy from mdn
            window.clipboardData
        ).getData("text");
        const parsedCode = parsePastedCode(pasteCode);
        setCode(parsedCode);
    }

    function handleSubmit() {
        const error = validateCode(code);
        if (error) {
            setError(error);
        } else {
            // 防止连续点击
            if (verifying) {
                return;
            }
            setVerifying(true);

            const codeString = code.join('-');
            redeemService.verifyCode({
                code: codeString,
            })
            .then(res => {
                if (res.success && res.giftInfo) {
                    onVerifySucc(res.giftInfo, codeString)
                } else if (res.error) {
                    toast(res.error.message || '兑换失败，请联系客服')
                } else {
                    return Promise.reject(new Error('verify code unknown error'))
                }
            })
            .catch(err => {
                unknownErrorToast();
                logError(err);
            })
            .finally(() => {
                setVerifying(false);
            })
        }
    }

    // 实时校验
    useEffect(() => {
        if (dirty) {
            setError(validateCode(code));
        }
    }, [code, dirty]);

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                请输入兑换码:
            </label>
            <p className={styles.labelTip}>
                （4组，每组4位，支持粘贴完整的兑换码）
            </p>
            <div onPaste={handlePaste}>
                {inputLine}
            </div>
            <div className={styles.errorMsgLocator}>
                {error ? (
                    <div className={styles.errorMsg}>{error}</div>
                ) : null}
            </div>
            <button className={styles.confirmBtn} onClick={handleSubmit}>确认兑换</button>
            {verifying ? <Loading /> : null}
        </div>
    )
}
