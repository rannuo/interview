import { HistroyItem } from "../model";
import { IHistoryService } from "./IHistoryService";


const HISTORY_LOCAL_KEY = 'RedeemGiftHistory-eJuUdp3';

function sort(items: HistroyItem[]) {
    return items.slice().sort((a, b) => new Date(b.redeemTime).getTime() - new Date(a.redeemTime).getTime());
}

/**
 * 采用 localStorage 本地存储历史记录
 */
export class LocalHistoryService implements IHistoryService {
    constructor(
        private localKey = HISTORY_LOCAL_KEY,
        private maxItem = 5,
    ) {}

    private readLocalItems() {
        const itemsStr = localStorage.getItem(this.localKey);
        let items: HistroyItem[] = itemsStr ? JSON.parse(itemsStr) : [];
        items = sort(items);
        return items;
    }

    addItem(item: HistroyItem): void {
        let items = this.readLocalItems();
        items = items.slice(0, this.maxItem - 1);
        items.unshift(item);

        localStorage.setItem(this.localKey, JSON.stringify(items));
    }
    getRecentItems(): HistroyItem[] {
        const items = this.readLocalItems();
        return items.slice(0, this.maxItem);
    }
    clear(): void {
        localStorage.removeItem(this.localKey);
    }

}
