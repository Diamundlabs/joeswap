import React, { useState } from 'react'
import { toast } from 'react-toastify';


const DisconnectBtn = ({ setWalletAddress }) => {
  const { status, disconnect } = useMetaMask();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  // disconnect wallet
  const handleWalletDisconnect = async () => {
    try {
      setIsDisconnecting(true);
      // window.ethereum.disconnect();
      setWalletAddress("")
      toast("MetaMask has been disconnected")
      setIsDisconnecting(false);
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
    }
  };
  return (
    <div>
      <button
        className="flex justify-center border btn mt-4"
        onClick={handleWalletDisconnect}
      >
        {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  )
}

export default DisconnectBtn