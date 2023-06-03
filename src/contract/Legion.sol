// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JOEToken is ERC20 {
    constructor() ERC20("Legion Token", "LGTN") {
        _mint(msg.sender, 100 * 10 ** 18);
    }
}
