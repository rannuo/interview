import { useState } from "react";
import { toast, unknownErrorToast } from "../../base/toast";
import { GiftInfo, RedeemGiftResultInfo } from "../../model"
import { IRedeemService } from "../../services/IRedeemService";
import styles from './index.module.css';
import { IHistoryService } from "../../services/IHistoryService";
import { Loading } from "../../views/Loading";
import { logError } from "../../base/logger";
import { Dialog } from "../../views/Dialog";

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
    const [dialogMount, setDialogMount] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [redeeming, setRedeeming] = useState(false);


    function handleConfirm() {
        if (redeeming) {
            return;
        }
        setRedeeming(true);
        redeemService.redeemGift({
            code,
            giftId: giftInfo.id
        })
            .then(res => {
                if (res.success && res.resultInfo) {
                    // 领取成功
                    setRedeemInfo(res.resultInfo);
                    setDialogMount(true);
                    setDialogVisible(true);
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
                logError(err);
            })
            .finally(() => {
                setRedeeming(false);
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.giftName}>{giftInfo.name}</div>
            <div className={styles.giftDesc}>{giftInfo.description}</div>
            <div className={styles.giftExpireTime}>过期时间：{giftInfo.expireTime}</div>

            <div>礼品列表</div>
            <ul className={styles.list}>
                {giftInfo.items.map(x => (
                    <li key={x.id} className={styles.item}>
                        <img src={x.icon} className={styles.icon} />
                        <div className={styles.itemName}>
                            {x.name}
                        </div>
                        <div className={styles.itemAmount}>
                            {x.amount}
                        </div>
                    </li>
                ))}
            </ul>

            <button className={styles.confirmBtn} onClick={handleConfirm}>确认领取</button>
            {dialogMount && redeemInfo ? (
                // 领取成功反馈
                <Dialog
                    visible={dialogVisible}
                    onClose={() => {
                        setDialogMount(false);
                        // TODO: 弹窗关闭后续动作，找产品确认这些细节
                    }}
                >
                    <div className={styles.dialog}>
                        <h2>恭喜领取成功</h2>
                        <p>
                            订单号：{redeemInfo.orderNo}
                        </p>
                        <p>
                            领取时间: {redeemInfo.redeemTime}
                        </p>
                        <button onClick={() => setDialogVisible(false)}>OK</button>
                    </div>
                </Dialog>
            ) : null}
            {redeeming ? <Loading /> : null}
        </div>
    )
}
