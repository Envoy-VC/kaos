// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IKaos {
    struct Reality {
        uint256 startAt;
        uint256 endAt;
        uint256 startBlock;
        uint256 totalAmountForks;
        uint256 totalAmountBurns;
    }

    struct UserPool {
        uint256 totalAmountForks;
        uint256 totalAmountBurns;
        uint256 totalAmountKaos;
    }

    enum Action {
        FORK,
        BURN
    }

    // Custom Errors
    error RealityAlreadyExists();
    error RealityDoesNotExist();
    error RealityCollapsed();

    // Events
    event RealityCreated(bytes realityId);
    event AddKaosToReality(
        bytes realityId, uint256 amount, Action action, uint256 totalForksAmount, uint256 totalBurnsAmount
    );

    function createReality(bytes calldata _realityId) external;
    function addToReality(bytes calldata _realityId, uint256 _amount, Action action) external;
}
