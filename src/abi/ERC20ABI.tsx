export const ERC20ABI = [
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "ref",
       "type": "address"
      }
     ],
     "name": "buyEggs",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "ref",
       "type": "address"
      }
     ],
     "name": "hatchEggs",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "stateMutability": "nonpayable",
     "type": "constructor"
    },
    {
     "anonymous": false,
     "inputs": [
      {
       "indexed": true,
       "internalType": "address",
       "name": "previousOwner",
       "type": "address"
      },
      {
       "indexed": true,
       "internalType": "address",
       "name": "newOwner",
       "type": "address"
      }
     ],
     "name": "OwnershipTransferred",
     "type": "event"
    },
    {
     "inputs": [],
     "name": "renounceOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "seedMarket",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "sellEggs",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "newOwner",
       "type": "address"
      }
     ],
     "name": "transferOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "eth",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "contractBalance",
       "type": "uint256"
      }
     ],
     "name": "calculateEggBuy",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "eth",
       "type": "uint256"
      }
     ],
     "name": "calculateEggBuySimple",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "eggs",
       "type": "uint256"
      }
     ],
     "name": "calculateEggSell",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "adr",
       "type": "address"
      }
     ],
     "name": "cheezRewards",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "getBalance",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "adr",
       "type": "address"
      }
     ],
     "name": "getEggsSinceLastHatch",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "adr",
       "type": "address"
      }
     ],
     "name": "getMyEggs",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "adr",
       "type": "address"
      }
     ],
     "name": "getMyMiners",
     "outputs": [
      {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "owner",
     "outputs": [
      {
       "internalType": "address",
       "name": "",
       "type": "address"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    }
   ];