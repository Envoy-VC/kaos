// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

contract KaosToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    uint256 public INITIAL_PRICE = 1000 gwei;

    error NotEnoughBalance();

    constructor(address initialOwner) ERC20("Kaos", "KAOS") Ownable(initialOwner) ERC20Permit("Kaos") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function placeOrder(address to, uint256 amount) public payable {
        if (msg.value < amount * INITIAL_PRICE) {
            revert NotEnoughBalance();
        }
        _mint(to, amount);
    }

    function withdraw(uint256 amount) public onlyOwner {
        SafeTransferLib.safeTransferETH(owner(), amount);
    }

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    // Fallback
    receive() external payable {}
    fallback() external payable {}
}
