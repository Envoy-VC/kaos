// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Kaos} from "src/Kaos.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying with deployer address", deployerAddress);

        Kaos kaos = new Kaos();

        console.log("Deployed at address: %s", address(kaos));
        vm.stopBroadcast();
    }
}
