import { HistroyItem } from "../model";

/**
 * 历史记录 service 接口
 */
export interface IHistoryService {
    /**
     * 添加一条历史记录
     */ 
    addItem(item: HistroyItem): void;

    /**
     * 获取最近的历史记录
     */ 
    getRecentItems(): HistroyItem[];

    /**
     * 清空历史记录
     */ 
    clear(): void;
}

