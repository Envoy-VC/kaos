// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IKaos {
    struct Reality {
        uint256 startAt;
        uint256 endAt;
        uint256 startBlock;
        uint256 totalAmount;
        uint256 totalAmountForks;
        uint256 totalAmountBurns;
    }

    struct UserPool {
        uint256 totalAmount;
        uint256 totalAmountForks;
        uint256 totalAmountBurns;
        bool claimed;
    }

    enum Action {
        FORK,
        BURN
    }

    // Custom Errors
    error RealityAlreadyExists();
    error RealityDoesNotExist();
    error RealityCollapsed();
    error NotEnoughBalance();
    error RealityNotEnded();
    error AlreadyClaimed();

    // Events
    event RealityCreated(bytes realityId);
    event AddKaosToReality(
        bytes realityId, uint256 amount, Action action, uint256 totalForksAmount, uint256 totalBurnsAmount
    );
    event Claimed(bytes realityId, address user, uint256 amount);

    function createReality(bytes calldata _realityId) external;
    function addToReality(bytes calldata _realityId, uint256 _amount, Action action) external;
}
