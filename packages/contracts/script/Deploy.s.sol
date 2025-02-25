// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {Kaos} from "src/Kaos.sol";
import {KaosToken} from "src/KaosToken.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying with deployer address", deployerAddress);

        KaosToken token = new KaosToken(deployerAddress);
        Kaos kaos = new Kaos(address(token));
        console.log("Token deployed at address: %s", address(token));
        console.log("Kaos deployed at address: %s", address(kaos));
        vm.stopBroadcast();
    }
}
