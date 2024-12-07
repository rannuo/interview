import { VerifyCodeRequest, VerifyCodeResponse } from "../model";
import { IRedeemService } from "./IRedeemService";

export class RedeemService implements IRedeemService {
    verifyCode(req: VerifyCodeRequest): Promise<VerifyCodeResponse> {
        throw new Error("Method not implemented.");
        // TODO: 真实的请求后端接口逻辑
        // fetch...
    }
    
}
