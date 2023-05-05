<script>
  import Header from "./lib/Header.svelte";

  import { onMount } from "svelte";

  import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
  import { writable } from "svelte/store";

  let account = persist(writable(null), createLocalStorage(), "account");

  let isWalletInstalled = false;
  let loading = false;
  let showToast = true;
  let balance = 0;

  let message = "";

  onMount(() => {
    if (window?.ethereum) {
      message = "Ethereum support is available";
      isWalletInstalled = true;
    } else {
      message = "Please Installed Metatask";
    }
    (async () => {
      // await getBalance();
    })();
  });

  async function getBalance() {
    if ($account !== null || $account !== undefined || $account !== "") {
      balanceOwner($account).then((result) => (balance = result));
    } else {
      balance = 0;
    }
  }

  async function connectWallet() {
    loading = true;
    setTimeout(() => {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          $account = accounts[0];
        })
        .catch((error) => {
          alert("Something went wrong");
        });
      loading = false;
    }, 2000);
  }
</script>

{#if showToast}
  <div
    id="toast-default"
    class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute right-4 top-4 shadow-md"
    role="alert"
  >
    <div class="ml-3 text-sm font-normal text-white">{message}</div>
    <button
      type="button"
      on:click={() => (showToast = false)}
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-default"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
  </div>
{/if}
<Header
  account={$account}
  {isWalletInstalled}
  {connectWallet}
  {loading}
  {balance}
/>

<style>
</style>
