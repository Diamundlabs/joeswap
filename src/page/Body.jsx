import React, { useEffect, useId, useState } from 'react'
import Header from '../component/Header';
import Web3 from 'web3';
import { ERC20_ABI, getTimeStamp, Router } from '../helpers/helper';
import { toast } from 'react-toastify';
import MoonLoader from "react-spinners/MoonLoader";


const Body = () => {
  const id = useId();
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [message, setMessage] = useState("");
  const [swapMessage, setSwapMessage] = useState("Swap Tokens");
  const [currentSwap, setCurrentSwap] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const [accountBalance, setAccountBalance] = useState('');
  const [balanceERC20, setBalanceERC20] = useState('');
  const [wallet, setWallet] = useState('');

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');


  // BN instance
  let BN = Web3.utils.BN;


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
    setValue1(input2)
    setValue2(input1)
    setCurrentSwap(!currentSwap)
  }

  // Function to get the ETH balance of the connected wallet
  const getETHBalance = async () => {
    const web3 = new Web3(window.ethereum);

    try {
      // Get the balance of the selected address
      const balanceWei = await web3.eth.getBalance(wallet);

      // Convert the balance from Wei to Ether
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      // set the ETH balance
      setAccountBalance(balanceEth)
    } catch (error) {
      console.error(error);
    }
  };

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
          setBalanceERC20(web3.utils.fromWei(result, 'ether'));
        })
        .catch(error => {
          console.error('Error fetching token balance:', error);
        });
    } else {
      console.error('Metamask not detected');
    }
  }

  // get swap premonition
  const getOutputs = async (value) => {
    // Check if Web3 has been injected by the browser (Metamask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      let valueEntered = web3.utils.toWei(value)
      const routerAddress = import.meta.env.VITE_ROUTER_CONTRACT_ADDRESS;

      // Get the ERC20 token contract instance
      const tokenContract = new web3.eth.Contract(Router, routerAddress);

      // Get the token balance for the specified account
      await tokenContract.methods.getAmountsOut(valueEntered, [currentSwap ? import.meta.env.VITE_WETH_CONTRACT_ADDRESS : import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS, currentSwap ? import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS : import.meta.env.VITE_WETH_CONTRACT_ADDRESS]).call()
        .then(result => {
          setInput2(web3.utils.fromWei(result[1], 'ether'))
          setValue1(result[0])
          setValue2(result[1])
        })
        .catch(error => {
          setInput2("")
        });
    } else {
      console.error('Metamask not detected');
    }
  }

  // swap tokens
  const swapToken = async () => {
    // Check if Web3 has been injected by the browser (Metamask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const routerAddress = import.meta.env.VITE_ROUTER_CONTRACT_ADDRESS;

      // Get the router contract instance
      const routerContract = new web3.eth.Contract(Router, routerAddress);
      // Get the ERC20 contract address
      const tokenAddress = import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS;
      const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);



      setSwapMessage("Swapping Tokens")

      // swap eth for erc20Token
      if (currentSwap) {
        const valueToWei = web3.utils.toWei(input1, 'ether')
        await routerContract.methods.swapETHForExactTokens(value2, [import.meta.env.VITE_WETH_CONTRACT_ADDRESS, import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS], wallet, getTimeStamp()).send({ from: wallet, value: valueToWei })
          .then(result => {
            toast.success("Token successfully swapped")
            setSwapMessage("Swap Tokens")
            setInput1("")
            setInput2("")
            getERC20()
            getETHBalance()
          })
          .catch(error => {
            toast.error("Swap failed")
            setSwapMessage("Swap Tokens")
          });
      }
      // swap erc20Token for eth
      else {
        await tokenContract.methods.approve(routerAddress, value1).send({ from: wallet })
          .then(async result => {
            console.log("result", result)
            await routerContract.methods.swapExactTokensForETH(value1, value2, [import.meta.env.VITE_ERC20TOKEN_CONTRACT_ADDRESS, import.meta.env.VITE_WETH_CONTRACT_ADDRESS], wallet, getTimeStamp()).send({ from: wallet })
              .then(result => {
                toast.success("Tokens successfully swapped")
                setSwapMessage("Swap Tokens")
                setInput1("")
                setInput2("")
                getERC20()
                getETHBalance()
              })
              .catch(error => {
                toast.error("Swap failed")
                setSwapMessage("Swap Tokens")
              });
          })
          .catch(error => {
            setSwapMessage("Swap Tokens")
          });

      }
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
                    disabled={swapMessage === "Swapping Tokens"}
                    style={{ backgroundColor: 'transparent' }}
                    onChange={(e) => { setInput1(e.target.value); getOutputs(e.target.value) }}
                    className="input input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
                  />
                  <span className="p-2 text-base">{currentSwap ? "ETH" : "LGTN"}</span>

                </div>
                <span className="pl-4">
                  Balance: {accountBalance === "" ? "N/A" : currentSwap ? (Number(accountBalance).toFixed(3)) : (Number(balanceERC20).toFixed(3))}
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
                    disabled
                    onChange={(e) => { setInput2(e.target.value); getOutputs(e.target.value) }}
                    style={{ backgroundColor: 'transparent' }}
                    className="input border-0 input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
                  />
                  <span className="p-2 text-base">{!currentSwap ? "ETH" : "LGTN"}</span>
                </div>
                <span className="pl-4">
                  Balance: {balanceERC20 === "" ? "N/A" : currentSwap ? (Number(balanceERC20).toFixed(3)) : (Number(accountBalance).toFixed(3))}
                </span>
              </div>
              {isWallet &&
                <button onClick={() => swapToken()}
                  className="btn btn-primary w-full mt-4 block text-lg flex items-center gap-3"
                  disabled={(input1 === "" || Number(input1) === 0) || (value2 === "" || Number(value2) === 0) || swapMessage !== "Swap Tokens" || ((currentSwap && Number(input1) > Number(accountBalance))) || ((!currentSwap && Number(input1) > Number(balanceERC20)))}
                  color="dark"
                >
                  {swapMessage !== "Swap Tokens" && <MoonLoader
                    color={"#ffffff"}
                    size={20}
                    data-testid={id} />}
                  <span>
                    {swapMessage}
                  </span>

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