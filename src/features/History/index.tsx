import { useEffect, useState } from "react";
import { IHistoryService } from "../../services/IHistoryService"
import { HistroyItem } from "../../model";

import styles from './index.module.css';
import { Loading } from "../../views/Loading";

interface IProps {
    historyService: IHistoryService;
    onClose: () => void;
}

/**
 * 历史记录界面
 */
export const HistoryView = ({ historyService, onClose }: IProps) => {
    
    const [historyItems, setHistoryItems] = useState<HistroyItem[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const items = historyService.getRecentItems();
        setHistoryItems(items);
        setLoading(false);
    }, []);

    return (
        <div className={styles.container}>
            {loading ? (
                <Loading singleton />
            ) : (
                historyItems.length > 0 ? (
                    <ul className={styles.list}>
                        {historyItems.map(x => (
                            <li key={x.redeemTime} className={styles.item}>
                                <div className={styles.giftName}>{x.giftInfo.name}</div>
                                <div className={styles.giftDesc}>{x.giftInfo.description}</div>
                                <div className={styles.giftExpireTime}>过期时间：{x.giftInfo.expireTime}</div>
                                <div className={styles.giftRedeemTime}>兑换时间：{x.redeemResultInfo.redeemTime}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>暂时没有记录，快去兑换吧</div>
                )
            )}
    
            <button className={styles.closeBtn} onClick={onClose}>X</button>
        </div>
    )
}