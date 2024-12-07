import { VerifyCodeRequest, VerifyCodeResponse } from "../model";
import { IRedeemService } from "./IRedeemService";

const mockSuccessVerifyCode: VerifyCodeResponse = {
    success: true,
    giftInfo: {
        id: 'abc',
        name: '尊享大礼包',
        description: '仅限当日，请快快领取',
        expireTime: '2024-12-07',
        items: [
            {
                id: 'abc-1',
                name: '一只熊',
                icon: 'https://picsum.photos/id/237/16/16',
                amount: 1,
            },
            {
                id: 'abc-2',
                name: '一只熊',
                icon: 'https://picsum.photos/id/237/16/16',
                amount: 2,
            },
            {
                id: 'abc-3',
                name: '一只熊',
                icon: 'https://picsum.photos/id/237/16/16',
                amount: 3,
            },
        ],
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
        return Promise.resolve(mockSuccessVerifyCode);
    }
}
