import React, { useState } from "react"
import MetaMask from "../assets/metamask.svg"
import { toast } from 'react-toastify';
import Web3 from 'web3';


let theme = localStorage.getItem("theme");

const Header = ({ isWalletInstalled, setAccountBalance, setIsWallet, setWallet }) => {
  const [showDrawer, setDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const web3 = new Web3(window.ethereum);


  // hide modal
  function toggleDrawer() {
    setDrawer(!showDrawer);
  }

  // connect wallet
  const handleWalletConnect = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWallet(accounts[0]);
        // Get the account balance
        const balance = await web3.eth.getBalance(accounts[0]);

        // Convert balance from Wei to Ether
        console.log(balance)
        const etherBalance = web3.utils.fromWei(balance, 'ether');

        // Update the state with the account balance
        setAccountBalance(etherBalance);
        toast("MetaMask has been connected")
      } catch (err) {
        console.error(err.message);
        toast("User rejected the request")
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
      toast("MetaMask not installed")
    }
  };


  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWallet(accounts[0]);
          setIsWallet(true)

          // Get the account balance
          const balance = await web3.eth.getBalance(accounts[0]);

          // Convert balance from Wei to Ether
          const etherBalance = web3.utils.fromWei(balance, 'ether');

          // Update the state with the account balance
          setAccountBalance(etherBalance);
        } else {
          setAccountBalance("");
          setIsWallet(false)
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", async (accounts) => {
        setWalletAddress(accounts[0]);
        setWallet(accounts[0]);
        // Get the account balance
        if (accounts.length > 0) {
          setIsWallet(true)
          const balance = await web3.eth.getBalance(accounts[0]);
          // Convert balance from Wei to Ether
          const etherBalance = web3.utils.fromWei(balance, 'ether');

          // Update the state with the account balance
          setAccountBalance(etherBalance);
        } else {
          setAccountBalance("");
          setIsWallet(false)
        }
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
    }
  };

  async function changeTheme(choice) {
    const body = document.body;
    switch (choice) {
      case (choice = "cmyk"):
        localStorage.setItem("theme", "cmyk");
        body.setAttribute("data-theme", "cmyk");
        break;

      case (choice = "garden"):
        localStorage.setItem("theme", "garden");
        body.setAttribute("data-theme", "garden");
        break;

      case (choice = "dark"):
        localStorage.setItem("theme", "dark");
        body.setAttribute("data-theme", "dark");
        break;

      default:
        break;
    }
  }

  React.useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  return (

    <div className="">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ><path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                /></svg
              >
            </label>
          </div>
          <a className="btn btn-ghost normal-case text-xl">joeswap</a>
        </div>
        <div className="navbar-center hidden lg:flex" />

        <div className="navbar-end">
          <label
            onClick={toggleDrawer}
            htmlFor="my-drawer-4"
            className="drawer-button btn text-lg">
            Connect{walletAddress && walletAddress.length > 0 ? "ed" : ""}</label>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input
          id="my-drawer-4"
          checked={showDrawer}
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content" />
        <div className={`drawer-side ${showDrawer && "z-20 relative"}`}>
          <label htmlFor="my-drawer-4" className="drawer-overlay" />
          <ul className="menu p-4 w-full md:max-w-sm bg-base-100 text-base-content">
            {/* Sidebar content here */}

            {/* <!-- change themes --> */}
            <div className="flex gap-3 items-center">
              <span className="text-sm">Theme</span>
              <div className="tabs tabs-boxed py-3 w-full">
                <span
                  className={`tab text-lg ${theme === "garden" && "tab-active"}`}
                  onClick={() => changeTheme("garden")}>Auto</span
                >

                <span
                  className={`tab text-lg ${theme === "cmyk" && "tab-active"}`}
                  onClick={() => changeTheme("cmyk")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </span>

                {/* night theme */}
                <span
                  className={`tab text-lg ${theme === "dark" && "tab-active"}`}
                  onClick={() => changeTheme("dark")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* <!-- button for connecting to wallet --> */}

            {isWalletInstalled ?
              <>
                {!isLoading &&
                  <div className="flex items-center lg:order-2 mt-3">
                    <div
                      color="dark"
                      className="w-full py- h-fit py-3 flex text-start justify-between btn btn-sm"
                    >
                      <div className="flex justify-between w-fit gap-2 items-center">
                        <img src={MetaMask} alt="React Logo" className="w-8" />
                        <span>Metamask</span>
                      </div>
                      <button
                        className=""
                        onClick={handleWalletConnect}
                      >
                        {walletAddress && walletAddress.length > 0
                          ? `Connected: ${walletAddress.substring(
                            0,
                            6
                          )}...${walletAddress.substring(38)}`
                          : "Connect Wallet"}
                      </button>

                    </div>
                  </div>
                }
              </>
              :
              <div className="flex items-center lg:order-2">
                <a
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                >
                  <button
                    className="inline-flex items-center p-2 mt-3 btn text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    Install Wallet
                  </button>
                </a>
              </div>
            }
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Header