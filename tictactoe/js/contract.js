const abi = [
{
  "inputs": [],
  "name": "close",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "CurrentScore",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "wins",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "losses",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "initialized",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getLosses",
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
  "name": "getName",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getWins",
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
      "internalType": "bytes32",
      "name": "_name",
      "type": "bytes32"
    }
  ],
  "name": "initialize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "isInitialized",
  "outputs": [
    {
      "internalType": "bool",
      "name": "initialized",
      "type": "bool"
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
},
{
  "inputs": [
    {
      "internalType": "bool",
      "name": "winner",
      "type": "bool"
    }
  ],
  "name": "setResult",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}
]


let iFU = {};
let address = '';
async function initETH(){
    const injectedProvider = window.ethereum;
    const addresses = await injectedProvider.enable();
    const iWeb3 = new Web3(injectedProvider);
    address = addresses[0];
    iFU = new iWeb3.eth.Contract(
      abi,
      '0x741f40106a56bCe6Cc6CE87C6fC52B5883fD72ae', {from: address}
    );
  }
/*  window.addEventListener('load', () => {
   // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        ETHawait window.ethereum.enable();
        // Acccounts now exposed
        return web3;
      } catch (error) {
        console.error(error);
      }
      initETH();

   }
    });
*/
$(document).ready(function() {
initETH();
web3.eth.defaultAccount = web3.eth.accounts[0];
//var FUContract = web3.eth.contract(abi);
//var TicTac = FUContract.at('0x06cDF0619c9311ca890Fb10a0Aa9EF66eA336a90');
console.log(iFU.methods.isInitialized().call());
});
