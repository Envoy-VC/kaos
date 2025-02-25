// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IKaos} from "./interfaces/IKaos.sol";

contract Kaos is IKaos, ReentrancyGuard {
    // Reality Id (bytes) => Reality
    mapping(bytes => Reality) public realities;

    // Reality Id (bytes) => User Address(address) => UserPool
    mapping(bytes => mapping(address => UserPool)) public userPools;

    IERC20 public kaosToken;

    constructor(address _kaosToken) {
        kaosToken = IERC20(_kaosToken);
    }

    function createReality(bytes calldata _realityId) external nonReentrant {
        if (realities[_realityId].startBlock != 0) {
            revert RealityAlreadyExists();
        }

        realities[_realityId] = Reality({
            startBlock: block.number,
            totalAmount: 0,
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

        if (kaosToken.balanceOf(msg.sender) < _amount) {
            revert NotEnoughBalance();
        }

        kaosToken.transferFrom(msg.sender, address(this), _amount);

        if (action == Action.FORK) {
            realities[_realityId].totalAmountForks += _amount;
            userPools[_realityId][msg.sender].totalAmountForks += _amount;
        }

        if (action == Action.BURN) {
            realities[_realityId].totalAmountBurns += _amount;
            userPools[_realityId][msg.sender].totalAmountBurns += _amount;
        }

        userPools[_realityId][msg.sender].totalAmount += _amount;
        realities[_realityId].totalAmount += _amount;

        emit AddKaosToReality(
            _realityId, _amount, action, realities[_realityId].totalAmountForks, realities[_realityId].totalAmountBurns
        );
    }

    function claimKaos(bytes calldata _realityId) external nonReentrant {
        // Check if the reality exists
        if (realities[_realityId].startBlock == 0) {
            revert RealityDoesNotExist();
        }

        // Check if the reality has ended
        if (block.timestamp < realities[_realityId].endAt) {
            revert RealityNotEnded();
        }

        // Check if the user has already claimed
        if (userPools[_realityId][msg.sender].claimed) {
            revert AlreadyClaimed();
        }

        userPools[_realityId][msg.sender].claimed = true;

        Action winningSide;
        if (realities[_realityId].totalAmountForks > realities[_realityId].totalAmountBurns) {
            winningSide = Action.FORK;
        } else {
            winningSide = Action.BURN;
        }

        uint256 stakedAmount;
        if (winningSide == Action.FORK) {
            stakedAmount = userPools[_realityId][msg.sender].totalAmountForks;
        } else {
            stakedAmount = userPools[_realityId][msg.sender].totalAmountBurns;
        }

        uint256 totalStakedAmount;
        if (winningSide == Action.FORK) {
            totalStakedAmount = realities[_realityId].totalAmountForks;
        } else {
            totalStakedAmount = realities[_realityId].totalAmountBurns;
        }

        // Reward = (User Stake / Total Staked) * Total Kaos
        uint256 reward = ((stakedAmount * realities[_realityId].totalAmount) / totalStakedAmount);
        kaosToken.transfer(msg.sender, reward);
        emit Claimed(_realityId, msg.sender, reward);
    }

    // Fallback
    receive() external payable {}
    fallback() external payable {}
}
