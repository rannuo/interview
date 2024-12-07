import { useState } from "react";
import { toast, unknownErrorToast } from "../../base/toast";
import { GiftInfo, RedeemGiftResultInfo } from "../../model"
import { IRedeemService } from "../../services/IRedeemService";
import styles from './index.module.css';
import { IHistoryService } from "../../services/IHistoryService";

interface IProps {
    giftInfo: GiftInfo;
    code: string;
    redeemService: IRedeemService;
    historyService: IHistoryService;
}

/**
 * 领取礼品界面
 */
export const RedeemGiftView = ({ giftInfo, code, redeemService, historyService }: IProps) => {
    const [redeemInfo, setRedeemInfo] = useState<RedeemGiftResultInfo | null>(null);
    function handleConfirm() {
        redeemService.redeemGift({
            code,
            giftId: giftInfo.id
        })
            .then(res => {
                if (res.success && res.resultInfo) {
                    // 领取成功
                    setRedeemInfo(res.resultInfo);
                    historyService.addItem({
                        giftInfo,
                        redeemResultInfo: res.resultInfo,
                        redeemTime: new Date().toISOString(),
                    });
                } else if (res.error) {
                    toast(res.error.message || '未知错误，请联系客服');
                }
            })
            .catch(err => {
                unknownErrorToast();
            })
    }

    return (
        <div className={styles.giftPage}>
            <div>
                <dl>
                    <dt>ID</dt>
                    <dd>{giftInfo.id}</dd>
                    <dt>礼品名称</dt>
                    <dd>{giftInfo.name}</dd>
                    <dt>礼品描述</dt>
                    <dd>{giftInfo.description}</dd>
                    <dt>过期时间</dt>
                    <dd>{giftInfo.expireTime}</dd>
                </dl>
                <ul>
                    {giftInfo.items.map(x => (
                        <li key={x.id}>
                            <img src={x.icon} />
                            {x.name}
                            {'x' + x.amount}
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={handleConfirm}>确认领取</button>
                </div>
            </div>
            {redeemInfo ? (
                // 领取成功反馈
                <dialog open>
                    恭喜领取成功
                    订单号：{redeemInfo.orderNo}
                    领取时间: {redeemInfo.redeemTime}
                </dialog>
            ) : null}
        </div>
    )
}
