import { RedeemGiftRequest, RedeemGiftResponse, VerifyCodeRequest, VerifyCodeResponse } from "../model";
import { formatDate, sleep } from "../utils";
import { IRedeemService } from "./IRedeemService";

function mockGifts(n: number) {
    const rets =  [];
    for (let i = 0; i < n; i ++) {
        rets.push(
            {
                id: 'abc-' + i,
                name: '一只熊' + '熊'.repeat(i),
                icon: 'https://picsum.photos/id/237/30/30',
                amount: i,
            }
        )
    }
    return rets;
}

const mockSuccessVerifyCode: VerifyCodeResponse = {
    success: true,
    giftInfo: {
        id: 'abc',
        name: '尊享大礼包',
        description: '仅限当日，请快快领取',
        expireTime: formatDate(new Date()),
        items: mockGifts(10),
    }
}

function log(...args: any[]) {
    console.log(`[${MockRedeemService.name}]`, ...args);
} 

/**
 * 开发或者测试使用的 mock service
 */
export class MockRedeemService implements IRedeemService {
    
    verifyCode(req: VerifyCodeRequest): Promise<VerifyCodeResponse> {
        // TODO: 可以用装饰器优化
        log('[verifyCode][request]: ', req);
        log('[verifyCode][response]: ', mockSuccessVerifyCode);
        return sleep(2000).then(() => mockSuccessVerifyCode);
    }

    redeemGift(req: RedeemGiftRequest): Promise<RedeemGiftResponse> {
        log('[redeemGift][request]: ', req);
        const mockRedeemSucc: RedeemGiftResponse = {
            success: true,
            resultInfo: {
                orderNo: '123456',
                redeemTime: formatDate(new Date())
            },
        };
        log('[redeemGift][response]: ', mockRedeemSucc);
        return sleep(2000).then(() => mockRedeemSucc);
    }
}
