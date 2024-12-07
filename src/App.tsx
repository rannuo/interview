import { useState } from 'react';

import { VerifyCodeView } from './features/VerifyCode';
import { RedeemGiftView } from './features/RedeemGift';

import { RedeemService } from './services/RedeemService';
import { LocalHistoryService } from './services/LocalHistoryService';
import { MockRedeemService } from './services/MockRedeemService';

import { GiftInfo } from './model';

import { IHistoryService } from './services/IHistoryService';
import { HistoryView } from './features/History';
import './App.css';


type Step = {
  step: 'redeem'
} | {
  step: 'receive',
  code: string;
  giftInfo: GiftInfo
};

function App() {

  const [redeemService] = useState(() => {
    if (import.meta.env.DEV) {
      return new MockRedeemService();
    }
    return new RedeemService;
  });

  const [historyService] = useState<IHistoryService>(() => new LocalHistoryService());

  const [step, setStep] = useState<Step>(() => ({ step: 'redeem' } as Step));

  const [historyVisible, setHistoryVisible] = useState(false);

  function handleRedeemSucc(giftInfo: GiftInfo, code: string) {
    setStep({
      step: 'receive',
      giftInfo,
      code,
    });
  }

  return (
    <div className='app'>
      {step.step === 'redeem' ? (
        <VerifyCodeView
          redeemService={redeemService}
          onRedeemSucc={handleRedeemSucc}
        />
      ) : null}
      {step.step === 'receive' ? (
        <RedeemGiftView giftInfo={step.giftInfo} code={step.code} redeemService={redeemService} historyService={historyService} />
      ) : null}

      <button className="historyBtn" onClick={() => setHistoryVisible(true)}>History</button>
      {historyVisible ? <HistoryView historyService={historyService} onClose={() => setHistoryVisible(false)} /> : null}
    </div>
  )
}

export default App
