// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {Kaos} from "src/Kaos.sol";
import {KaosToken} from "src/KaosToken.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        address deployerAddress = 0x9e6DA9202eD28761782330210e3D018e1Fdc484b;
        vm.startBroadcast();

        console.log("Deploying with deployer address", deployerAddress);
        KaosToken token = new KaosToken(deployerAddress);
        Kaos kaos = new Kaos(address(token));
        console.log("Token deployed at address: %s", address(token));
        console.log("Kaos deployed at address: %s", address(kaos));
        vm.stopBroadcast();
    }
}
