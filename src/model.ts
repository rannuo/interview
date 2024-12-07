// 验证兑换码
export interface VerifyCodeRequest {
    code: string; // 完整兑换码
}

export interface VerifyCodeResponse {
    success: boolean;
    giftInfo?: {
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

export interface RedeemGiftResponse {
    success: boolean;
    resultInfo?: {
        orderNo: string;
        redeemTime: string;
    };
    error?: {
        code: number;
        message: string;
    }
}
