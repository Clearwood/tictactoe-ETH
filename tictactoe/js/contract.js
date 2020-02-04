let iFU = {};
let cFU = {};
//setting HTTP web3 provider for faster get calls
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/e828d17619ef4075a3a0d824e16712b0"))
let address = '';
//initializing web3 providers and getting addresses
//0x741f40106a56bCe6Cc6CE87C6fC52B5883fD72ae is the address of the deployed contract
async function initETH(){
    const injectedProvider = window.ethereum;
    const addresses = await injectedProvider.enable();
    const iWeb3 = new Web3(injectedProvider);
    address = addresses[0];
    iFU = new iWeb3.eth.Contract(
      abi,
      '0x741f40106a56bCe6Cc6CE87C6fC52B5883fD72ae', {from: address}
    );
    cFU = new iWeb3.eth.Contract(
      abi,
      '0x741f40106a56bCe6Cc6CE87C6fC52B5883fD72ae', {from: address}
    );
    web3.eth.defaultAccount = web3.eth.accounts[0];
  }

//getting name variable and converting to utf8
function getName(cb){
  cFU.methods.getName().call()
  .then(function(result){
      cb(web3.utils.toUtf8(result));
  });
  }

//getting the number of Wins
function getWins(cb){
    cFU.methods.getWins().call()
    .then(function(result){
        cb(result);
    });
    }
//getting the number of losses
function getLosses(cb){
        cFU.methods.getLosses().call()
        .then(function(result){
            cb(result);
        });
        }

//checking if user is initialized
function isInitialized(cb){
  cFU.methods.isInitialized().call()
  .then(function(result){
      cb(result);
  });
}

//writing results in scoreboard
function writeResults(value, initial = false){
  if(initial || value){
    getWins(function(result){
      $("#win").text(result);
    });
  }
  if(initial || !value){
    getLosses(function(result){
      $("#loss").text(result);
    });
  }
}

//setting win or loss preparing interactive transaction
function setResult(value){
  iFU.methods.setResult(value).send()
  .then(function(result){
      console.log(result);
      writeResults(value);
  });
}

//preparing interactive transaction to initalize user as well as closing modal after completion
function setInitialize(name){
  iFU.methods.initialize(web3.utils.utf8ToHex(name)).send()
  .then(function(result){
    console.log(result);
    initializePlayer();
    $("#myModal").toggle();
  });
}

//checking if user is initialized and loading data otherwise opening modal to let the user input a nickname
function InitCheck(){
  isInitialized(function(x){
    if(x){
      initializePlayer();
    } else {
      $("#myModal").toggle();
      $("#submit").click(function(x){
        setInitialize($("#nick").val());
        $(".modal-content").text("Waiting for Initialization.");
    });
    }
  })
}

//loading the initialization function on page load
$(document).ready(function() {
initETH().then(InitCheck);
});

//initalizing players result as well as nickname
function initializePlayer(){
  getName(function(result){
    $("#player").text(result);
  });
  writeResults(undefined, true);
}
