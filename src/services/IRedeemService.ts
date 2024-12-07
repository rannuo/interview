import { VerifyCodeRequest, VerifyCodeResponse } from '../model';

/**
 * 兑换码服务
 */
export interface IRedeemService {
    /**
     * 兑换动作
     */
    verifyCode(req: VerifyCodeRequest): Promise<VerifyCodeResponse>;
}
