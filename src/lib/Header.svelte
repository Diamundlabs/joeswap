<script>
  import truncateEthAddress from "truncate-eth-address";
  export let isWalletInstalled, connectWallet, loading, account, balance;

  let showDrawer = false;

  let truncatedAccount = account === null ? null : truncateEthAddress(account);

  // hide modal
  function toggleDrawer() {
    showDrawer = !showDrawer;
  }
</script>

<div>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabIndex={0} class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
      <a class="btn btn-ghost normal-case text-xl">joeswap</a>
    </div>
    <div class="navbar-center hidden lg:flex" />

    <div class="navbar-end">
      {#if isWalletInstalled && truncatedAccount === null}
        <label
          on:click={toggleDrawer}
          htmlFor="my-drawer-4"
          class="drawer-button btn btn-primary">Connect</label
        >
      {:else}
        <button on:click={connectWallet} color="dark">
          {truncatedAccount}
        </button>
      {/if}
    </div>
  </div>

  <div class="drawer drawer-end">
    <input
      id="my-drawer-4"
      checked={showDrawer}
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-content" />
    <div class="drawer-side">
      <label htmlFor="my-drawer-4" class="drawer-overlay" />
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        {#if isWalletInstalled}
          <div class="flex items-center lg:order-2">
            {#if isWalletInstalled && truncatedAccount === null}
              <button
                on:click={connectWallet}
                color="dark"
                class="w-full py-4 flex text-start items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>

                Browser Wallet
              </button>
            {:else}
              <button on:click={connectWallet} color="dark">
                {truncatedAccount}
              </button>
            {/if}
          </div>
        {:else}
          <div class="flex items-center lg:order-2">
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              <button color="dark">Install Wallet</button>
            </a>
            <btn
              on:click={toggleDrawer}
              btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            />
          </div>
        {/if}
      </ul>
    </div>
  </div>
</div>
