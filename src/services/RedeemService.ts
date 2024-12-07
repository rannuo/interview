import { RedeemGiftRequest, RedeemGiftResponse, VerifyCodeRequest, VerifyCodeResponse } from "../model";
import { IRedeemService } from "./IRedeemService";

export class RedeemService implements IRedeemService {
    verifyCode(req: VerifyCodeRequest): Promise<VerifyCodeResponse> {
        throw new Error("Method not implemented.");
        // TODO: 真实的请求后端接口逻辑
        // fetch...
    }

    redeemGift(req: RedeemGiftRequest): Promise<RedeemGiftResponse> {
        throw new Error("Method not implemented.");
        // TODO: 真实的请求后端接口逻辑
        // fetch...
    }
}
