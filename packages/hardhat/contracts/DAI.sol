//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAI is ERC20 {
  constructor(uint256 initialSupply, address holder) ERC20("DAI", "DAI") {
    _mint(holder, initialSupply);
  }
}
