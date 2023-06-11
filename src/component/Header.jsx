import React, { useState } from "react"

const Header = ({ isWalletInstalled }) => {
  const [showDrawer, setDrawer] = useState(false);
  let theme = localStorage.getItem("theme");


  // hide modal
  function toggleDrawer() {
    setDrawer(!showDrawer);
  }


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
            Connect</label>
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

            {isWalletInstalled &&
              <div className="flex items-center lg:order-2 mt-3">
                <button
                  color="dark"
                  className="w-full py-4 flex text-start justify-start items-center gap-2 btn"
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
                      d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                    />
                  </svg>

                  Browser Wallet
                </button>
              </div>
            }
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

          </ul>
        </div>
      </div>
    </div>

  )
}

export default Header