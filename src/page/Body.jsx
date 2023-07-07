import React, { useEffect, useState } from 'react'
import Header from '../component/Header';
import Web3 from 'web3';
import { ERC20_ABI, Router } from '../helpers/helper';

const Body = () => {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [accountBalance, setAccountBalance] = useState('');
  const [balanceERC20, setBalanceERC20] = useState('');
  const [wallet, setWallet] = useState('');

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');


  useEffect(() => {
    localStorage.setItem("theme", "garden");
    if (window?.ethereum) {
      setMessage("Ethereum support is available");
      setIsWalletInstalled(true);
    } else {
      setMessage("Please Installed Metatask");
    }
  }, [])

  const swapFields = () => {
    // Swap the values of input1 and input2
    const temp = input1;
    setInput1(input2);
    setInput2(temp);
  }

  // get ERC token balance
  const getERC20 = async () => {
    // Check if Web3 has been injected by the browser (Metamask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const tokenAddress = import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS;
      const accountAddress = wallet;

      // Get the ERC20 token contract instance
      const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);

      // Get the token balance for the specified account
      await tokenContract.methods.balanceOf(accountAddress).call()
        .then(result => {
          setBalanceERC20(result);
        })
        .catch(error => {
          console.error('Error fetching token balance:', error);
        });
    } else {
      console.error('Metamask not detected');
    }
  }

  // get sawp premonition
  const getOutputs = async (value) => {
    console.log(value)
    // Check if Web3 has been injected by the browser (Metamask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const routerAddress = import.meta.env.VITE_ROUTER_CONTRACT_ADDRESS;
      const accountAddress = wallet;

      // Get the ERC20 token contract instance
      const tokenContract = new web3.eth.Contract(Router, routerAddress);

      // Get the token balance for the specified account
      await tokenContract.methods.getAmountsOut(value * 10 ** 18, [import.meta.env.VITE_WETH_CONTRACT_ADDRESS, import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS]).call()
        .then(result => {
          setInput2(web3.utils.fromWei(result[1], 'ether'))
        })
        .catch(error => {
          console.error('Error fetching amount:', error);
          setInput2("")
        });
    } else {
      console.error('Metamask not detected');
    }
  }

  useEffect(() => {
    {
      isWallet &&
        getERC20()
    }
  }, [wallet])



  return (
    <>
      {showToast &&
        <div className="relative z-30">
          <div
            id="toast-default"
            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute right-4 top-4 shadow-md"
            role="alert"
          >
            <div className="ml-3 text-sm font-normal text-white">{message}</div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-default"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      }
      <div className="h-screen overflow-hidden">

        <div className="h-16">
          <Header
            setAccountBalance={setAccountBalance}
            isWalletInstalled={isWalletInstalled}
            setIsWallet={setIsWallet}
            setWallet={setWallet}
          />
        </div>
        <div className="z-10 px-6 sm:px-0 h-full">
          <div className=" w-full md:max-w-lg mx-auto pt-10 relative">
            <span className="my-3 block pl-2 text-xl">Swap</span>
            <div className="flex flex-col w-full border-opacity-50">
              <div className="h-24 bg-base-300 rounded-box place-items-center">
                <div className="text-xl focus:outline-1 flex items-center mt-3">
                  <input
                    type="number"
                    value={input1}
                    onChange={(e) => { setInput1(e.target.value); getOutputs(e.target.value) }}
                    className="input input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
                  />
                  <span className="p-2 text-base">ETH</span>

                </div>
                <span className="pl-4">
                  Balance: {accountBalance === "" ? "N/A" : (Number(accountBalance).toFixed(3))}
                </span>
              </div>
              <div
                onClick={swapFields}
                className="bg-base-100 rounded-md w-fit p-2 mx-auto my-1 absolute top-40 left-0 right-0 z-10 hover:cursor-pointer hover:bg-base-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 bg-base-300 rounded-md p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>

              <div className="mt-2 h-24 bg-base-300 rounded-box place-items-center">
                <div className="text-xl focus:outline-1 flex items-center mt-3">
                  <input
                    type="number"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    className="input input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
                  />
                  <span className="p-2 text-base">LGTN</span>
                </div>
                <span className="pl-4">
                  Balance: {balanceERC20}
                </span>
              </div>
              {isWallet &&
                <button color="dark" className="btn btn-primary w-full mt-4 block text-lg">
                  Swap Tokens
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Body