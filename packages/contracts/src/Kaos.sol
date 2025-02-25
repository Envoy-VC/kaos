// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {IKaos} from "./interfaces/IKaos.sol";

contract Kaos is IKaos, ReentrancyGuard {
    // Reality Id (bytes) => Reality
    mapping(bytes => Reality) public realities;

    // Reality Id (bytes) => User Address(address) => UserPool
    mapping(bytes => mapping(address => UserPool)) public userPools;

    function createReality(bytes calldata _realityId) external nonReentrant {
        if (realities[_realityId].startBlock != 0) {
            revert RealityAlreadyExists();
        }

        realities[_realityId] = Reality({
            startBlock: block.number,
            totalAmountForks: 0,
            totalAmountBurns: 0,
            startAt: block.timestamp,
            endAt: block.timestamp + 1 days
        });
    }

    function addToReality(bytes calldata _realityId, uint256 _amount, Action action) external nonReentrant {
        if (realities[_realityId].startBlock == 0) {
            revert RealityDoesNotExist();
        }

        if (block.timestamp > realities[_realityId].endAt) {
            revert RealityCollapsed();
        }

        if (action == Action.FORK) {
            realities[_realityId].totalAmountForks += _amount;
            userPools[_realityId][msg.sender].totalAmountForks += _amount;
        }

        if (action == Action.BURN) {
            realities[_realityId].totalAmountBurns += _amount;
            userPools[_realityId][msg.sender].totalAmountBurns += _amount;
        }

        userPools[_realityId][msg.sender].totalAmountKaos += _amount;

        emit AddKaosToReality(
            _realityId, _amount, action, realities[_realityId].totalAmountForks, realities[_realityId].totalAmountBurns
        );
    }
}
