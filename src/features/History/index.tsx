import { useEffect, useState } from "react";
import { IHistoryService } from "../../services/IHistoryService"
import { HistroyItem } from "../../model";

interface IProps {
    historyService: IHistoryService;
    onClose: () => void;
}

/**
 * 历史记录界面
 */
export const HistoryView = ({ historyService, onClose }: IProps) => {
    
    const [historyItems, setHistoryItems] = useState<HistroyItem[]>([]);

    useEffect(() => {
        const items = historyService.getRecentItems();
        setHistoryItems(items);
    }, []);

    return (
        <dialog open>
            {historyItems.length > 0 ?(
                <ul>
                    {historyItems.map(x => (
                        <li key={x.redeemTime}>
                            {x.redeemResultInfo.orderNo}
                            {x.redeemResultInfo.redeemTime}
                        </li>
                    ))}
                </ul>
            ) : <div>loading...</div>}
            
            <button onClick={onClose}>Close</button>
        </dialog>
    )
}