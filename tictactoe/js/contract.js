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
    web3.eth.defaultAccount = web3.eth.accounts[0];
  }
function getName(cb){
  iFU.methods.getName().call()
  .then(function(result){
      cb(web3.toUtf8(result));
  });
  }
function getWins(cb){
    iFU.methods.getWins().call()
    .then(function(result){
        cb(result);
    });
    }
function getLosses(cb){
        iFU.methods.getLosses().call()
        .then(function(result){
            cb(result);
        });
        }
function isInitialized(cb){
  iFU.methods.isInitialized().call()
  .then(function(result){
      cb(result);
  });
}
function setResult(value, cb){
  iFU.methods.setResult(value).send()
  .then(function(result){
      cb(result);
  });
}

function setInitialize(name,cb){
  iFU.methods.initialize(web3.toHex(name)).send()
  .then(function(result){
      cb(result);
  });
}
$(document).ready(function() {
initETH();


//var FUContract = web3.eth.contract(abi);
//var TicTac = FUContract.at('0x06cDF0619c9311ca890Fb10a0Aa9EF66eA336a90');
});

function initializePlayer(){
  getName(function(result){
    $("#player").text(result);
  });
  setInterval(function(){
  console.log("interval reached");
  getWins(function(result){
    $("#win").text(result);
  });
  getLosses(function(result){
    $("#loss").text(result);
  });
}, 5000);
}

window.onload = (event) => {
  console.log('page is fully loaded');
  isInitialized(function(x){
    if(x){
      initializePlayer();
    } else {
      $("#myModal").toggle();
      $("#submit").click(function(x){
        setInitialize($("#nick").val());
        $(".modal-content").text("Waiting for Initialization.");
        var intId = setInterval(function(){
          isInitialized(function(x){
            if(x){
          initializePlayer();
          $("#myModal").toggle();
          clearInterval(intId);
        }
      });
      }, 1000);
    });
    }
  })
};
