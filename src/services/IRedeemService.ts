import { VerifyCodeRequest, VerifyCodeResponse, RedeemGiftRequest, RedeemGiftResponse } from '../model';

/**
 * 兑换码服务
 */
export interface IRedeemService {
    /**
     * 兑换动作
     */
    verifyCode(req: VerifyCodeRequest): Promise<VerifyCodeResponse>;
    /**
     * 领取礼品
     */
    redeemGift(req: RedeemGiftRequest): Promise<RedeemGiftResponse>;
}
