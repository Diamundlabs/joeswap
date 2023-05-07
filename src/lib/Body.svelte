<script>
  export let isWalletInstalled, connectWallet, loading, account, balance;
  import truncateEthAddress from "truncate-eth-address";
  import { formatUnits, parseUnits } from "ethers/lib/utils";

  let selectedToken = "ETH";
  let showDropDown = false;
  let tokenBalance = parseUnits("0.00251");
  let truncatedAccount = account === null ? null : truncateEthAddress(account);
</script>

<div class="z-10 px-6 sm:px-0">
  <div class=" w-full md:max-w-lg mx-auto mt-10 relative">
    <span class="my-3 block pl-2 text-xl">Swap</span>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="h-24 bg-base-300 rounded-box place-items-center">
        <div class="text-xl focus:outline-1 flex items-center mt-3">
          <input
            type="number"
            class="input input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
          />
          <div class="dropdown">
            <label
              tabIndex={0}
              class="btn m-1"
              on:click={() => (showDropDown = true)}>{selectedToken}</label
            >
            <ul
              tabIndex={0}
              class={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit mt-2 ${
                showDropDown ? "block" : "hidden"
              }`}
            >
              <li
                tabIndex={0}
                on:click={() => {
                  selectedToken = "ETH";
                  showDropDown = false;
                }}
              >
                <a>ETH</a>
              </li>
              <li
                on:click={() => {
                  selectedToken = "USDT";
                  showDropDown = false;
                }}
              >
                <a>USDT</a>
              </li>
            </ul>
          </div>
        </div>
        <span class="pl-4">
          Balance: {tokenBalance &&
            formatUnits(tokenBalance || parseUnits("0"))}
        </span>
      </div>
      <div
        class="bg-base-100 rounded-md w-fit p-2 mx-auto my-1 absolute top-28 left-0 right-0 z-10 hover:cursor-pointer hover:bg-base-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 bg-base-300 rounded-md p-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>

      <div class="mt-2 h-24 bg-base-300 rounded-box place-items-center">
        <div class="text-xl focus:outline-1 flex items-center mt-3">
          <input
            type="number"
            class="input input-ghost focus:outline-0 focus:bg-base-300 text-4xl pl-4"
          />
          <span class="p-2 text-base">JOE</span>
        </div>
        <span class="pl-4">
          Balance: {tokenBalance &&
            formatUnits(tokenBalance || parseUnits("0"))}
        </span>
      </div>

      {#if isWalletInstalled && truncatedAccount === null}
        <button
          on:click={toggleDrawer}
          class="btn btn-primary w-full mt-4 block text-lg"
          >Connect Wallet</button
        >
      {:else}
        <button color="dark" class="btn btn-primary w-full mt-4 block text-lg">
          Swap Tokens
        </button>
      {/if}
    </div>
  </div>
</div>
