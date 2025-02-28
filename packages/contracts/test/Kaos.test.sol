// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";
import {Kaos} from "src/Kaos.sol";
import {KaosToken} from "src/KaosToken.sol";
import {IKaos} from "src/interfaces/IKaos.sol";

contract KaosTest is Test {
    Kaos public kaos;
    KaosToken public token;
    Vm.Wallet public owner;
    Vm.Wallet public alice;
    Vm.Wallet public bob;

    function setUp() public {
        owner = vm.createWallet("owner");
        alice = vm.createWallet("alice");
        bob = vm.createWallet("bob");

        // Deal Ether
        vm.deal(owner.addr, 100 ether);
        vm.deal(alice.addr, 100 ether);
        vm.deal(bob.addr, 100 ether);

        token = new KaosToken(owner.addr);
        kaos = new Kaos(address(token));
    }

    function test_e2e() public payable {
        console.log("Alice $KAOS Balance", token.balanceOf(alice.addr));
        console.log("Bob $KAOS Balance", token.balanceOf(bob.addr));

        uint256 ONE_KAOS = 1 ether;
        uint256 ONE_KAOS_TO_ETH = token.INITIAL_PRICE();

        // Get KAOS Tokens for both users
        vm.startPrank(bob.addr);
        token.placeOrder{value: 100 * ONE_KAOS_TO_ETH}(bob.addr, 100 * ONE_KAOS);
        vm.stopPrank();

        vm.startPrank(alice.addr);
        token.placeOrder{value: 100 * ONE_KAOS_TO_ETH}(alice.addr, 100 * ONE_KAOS);
        vm.stopPrank();

        console.log("Alice $KAOS BalanceBalance", token.balanceOf(alice.addr) / 10 ** 18);
        console.log("Bob $KAOS BalanceBalance", token.balanceOf(bob.addr) / 10 ** 18);

        // Approve Kaos Tokens for Kaos contract
        vm.startPrank(bob.addr);
        token.approve(address(kaos), 100 * ONE_KAOS);
        vm.stopPrank();
        vm.startPrank(alice.addr);
        token.approve(address(kaos), 100 * ONE_KAOS);
        vm.stopPrank();

        bytes memory realityId = bytes("realityId");

        // Create a new reality
        vm.startPrank(owner.addr);
        kaos.createReality(realityId);
        console.log("Created Reality", string(realityId));

        // Deposit Tokens from Alice to Fork Reality
        kaos.addToReality(realityId, 50 ether, IKaos.Action.FORK, alice.addr);

        // Deposit Tokens from Bob to Burn Reality
        kaos.addToReality(realityId, 100 ether, IKaos.Action.BURN, bob.addr);

        // Wrap Time to next day
        vm.warp(block.timestamp + 1 days + 1 minutes);

        console.log("Alice Balance before claim", token.balanceOf(alice.addr) / 10 ** 18);
        console.log("Bob Balance before claim", token.balanceOf(bob.addr) / 10 ** 18);

        // Claim KAOS from reality
        vm.startPrank(alice.addr);
        kaos.claimKaos(realityId, alice.addr);
        vm.stopPrank();

        vm.startPrank(bob.addr);
        kaos.claimKaos(realityId, bob.addr);
        vm.stopPrank();

        console.log("Alice Balance after claim", token.balanceOf(alice.addr) / 10 ** 18);
        console.log("Bob Balance after claim", token.balanceOf(bob.addr) / 10 ** 18);
    }
}
