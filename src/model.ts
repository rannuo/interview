// 验证兑换码
export interface VerifyCodeRequest {
    code: string; // 完整兑换码
}

// 礼包内容
export interface GiftInfo {
    id: string;
    name: string;
    description: string;
    expireTime: string;
    items: Array<{
        id: string;
        name: string;
        icon: string;
        amount: number;
    }>;
};

export interface VerifyCodeResponse {
    success: boolean;
    giftInfo?: GiftInfo;
    error?: {
        code: number;
        message: string;
    };
}

// 确认领取礼包
export interface RedeemGiftRequest {
    code: string;
    giftId: string;
}

export interface RedeemGiftResultInfo {
    orderNo: string;
    redeemTime: string;
}

export interface RedeemGiftResponse {
    success: boolean;
    resultInfo?: RedeemGiftResultInfo;
    error?: {
        code: number;
        message: string;
    }
}


export interface HistroyItem {
    giftInfo: GiftInfo,
    redeemResultInfo: RedeemGiftResultInfo,
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    // date.toISOString()
    redeemTime: string;
}
