<script>
  import truncateEthAddress from "truncate-eth-address";
  export let isWalletInstalled, connectWallet, loading, account, balance;
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
      <a class="btn">Connect Wallet</a>
    </div>
  </div>
</div>
