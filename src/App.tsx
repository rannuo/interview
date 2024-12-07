import { useState } from 'react';
import { RedeemPage } from './features/Redeem';

import { RedeemService } from './services/RedeemService';
import { MockRedeemService } from './services/MockRedeemService';


function App() {
  const [redeemService] = useState(() => {
    if (import.meta.env.DEV) {
      return new MockRedeemService();
    }
    return new RedeemService;
  });
  return (
    <div id="root">
      <RedeemPage redeemService={redeemService} />
    </div>
  )
}

export default App
