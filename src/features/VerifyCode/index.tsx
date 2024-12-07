import { useState, useRef, useEffect } from "react"

import { solidStr, chunkStr } from '../../utils';
import styles from './index.module.css';
import { IRedeemService } from "../../services/IRedeemService";
import { GiftInfo } from '../../model';
import { toast, unknownErrorToast } from '../../base/toast';

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
        .map(x => x.slice(0, CODE_SEGMENT_LENGTH));
}

/**
 * 校验兑换码，返回 string 代表错误，返回 null 代表没问题
 * @param code 
 * @returns 
 */
function validateCode(code: RedeemCode): string | null {
    if (code.length < CODE_SEGMENTS) {
        return '兑换不足四组，请检查'
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
    onRedeemSucc: (giftInfo: GiftInfo, code: string) => void;
}
/**
 * 兑换码检验页面
 */
export const VerifyCodeView = ({ redeemService, onRedeemSucc }: IProps) => {
    // aaaa-aaaa-aaaa-aaaa
    const [code, setCode] = useState<string[]>(Array(CODE_SEGMENTS).fill(''));
    const [error, setError] =  useState<string | null>(null);

    const inputsRef = useRef(new Map<number, HTMLInputElement>());

    function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        setError(null);

        const codeValue = solidStr(e.target.value).slice(0, CODE_SEGMENTS);
        const newCode = code.slice();
        newCode[index] = codeValue;
        setCode(newCode);

        // 自动跳转下一个
        if (codeValue.length === CODE_SEGMENT_LENGTH) {
            inputsRef.current.get(index + 1)?.focus();
        }

        // TODO: 停留一段时间后校验，频繁校验体验不太好
    }

    const inputLine = [];

    for (let i = 0; i < CODE_SEGMENTS; i++) {
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
    }

    function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
        event.preventDefault();
        // @ts-ignore
        const pasteCode = (event.clipboardData || window.clipboardData).getData("text");
        const parsedCode = parsePastedCode(pasteCode);
        setCode(parsedCode);
        const error = validateCode(parsedCode);
        if (error) {
            setError(error);
        }
    }

    function handleSubmit() {
        const error = validateCode(code);
        if (error) {
            setError(error);
        } else {
            // TODO: 进行兑换
            // TODO: 防止连续点击
            const codeString = code.join('-');
            redeemService.verifyCode({
                code: codeString,
            })
            .then(res => {
                if (res.success && res.giftInfo) {
                    onRedeemSucc(res.giftInfo, codeString)
                } else if (res.error) {
                    toast(res.error.message || '兑换失败，请联系客服')
                } else {
                    return Promise.reject(new Error('verify code unknown error'))
                }
            })
            .catch(err => {
                unknownErrorToast();
                // TODO: 错误上报
                // logError(err);
            })
        }
    }

    // 实时校验
    useEffect(() => {
        const error = validateCode(code);
        if (error) {
            // 如果错误这里不处理
            // 错误信息在行为触发处设置，体验较好
        } else {
            // 如果正确，则置空错误信息
            setError(null);
        }
    }, [code]);

    return (
        <div>
            <div onPaste={handlePaste}>
                <label>请输入兑换码（4组，每组4位，支持粘贴完整的码）:</label>
                <br />
                {inputLine}
            </div>
            {error ? (
                <div>{error}</div>
            ) : null}
            <div>
                <button onClick={handleSubmit}>确认兑换</button>
            </div>
        </div>
    )
}
