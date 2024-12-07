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
  step: 'verify'
} | {
  step: 'redeem',
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

  const [step, setStep] = useState<Step>(() => ({ step: 'verify' } as Step));

  const [historyVisible, setHistoryVisible] = useState(false);

  function handleVerifySucc(giftInfo: GiftInfo, code: string) {
    setStep({
      step: 'redeem',
      giftInfo,
      code,
    });
  }

  return (
    <div className='app'>
      {step.step === 'verify' ? (
        <VerifyCodeView
          redeemService={redeemService}
          onVerifySucc={handleVerifySucc}
        />
      ) : null}
      {step.step === 'redeem' ? (
        <RedeemGiftView giftInfo={step.giftInfo} code={step.code} redeemService={redeemService} historyService={historyService} />
      ) : null}

      <button className="historyBtn" onClick={() => setHistoryVisible(true)}>History</button>
      {historyVisible ? <HistoryView historyService={historyService} onClose={() => setHistoryVisible(false)} /> : null}
    </div>
  )
}

export default App
