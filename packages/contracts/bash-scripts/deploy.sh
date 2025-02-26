#!/bin/bash

# Deploy the contracts
forge script script/Deploy.s.sol:DeployScript --rpc-url https://testnet-rpc.monad.xyz --account devWallet --sender "0x9e6DA9202eD28761782330210e3D018e1Fdc484b" --broadcast --verify --verifier sourcify --verifier-url https://sourcify-api-monad.blockvision.org -vvvv