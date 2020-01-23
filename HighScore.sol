pragma solidity >= 0.6.1;
contract HighScore {

    struct scores
    {
        bytes32 name;
        uint256 wins;
        uint256 losses;
        bool initialized;
    }

    scores[10] public topTen;

    address public owner;

    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }

    modifier onlyInitialized() {
        require(CurrentScore[msg.sender].initialized, "not an initialized user");
        _;
    }

    mapping(address => scores) public CurrentScore;

    constructor() public
    {
        owner = msg.sender;

        for (uint i = 0; i < topTen.length; i++) {
            topTen[i] = scores(0,0,0,false);
        }
    }


    function isInitialized() public view returns (bool initialized)
    {
        return CurrentScore[msg.sender].initialized;
    }

    function initialize(bytes32 _name) public
    {
       CurrentScore[msg.sender] = scores(_name, 0, 0, true);
    }


    function close() public onlyOwner
    {
    //onlyOwner is custom modifier, "owner" is the owners address
        selfdestruct(payable(owner));
    }


   function getName() public view onlyInitialized returns (bytes32)
    {
        return CurrentScore[msg.sender].name;
    }

    function getWins() public view onlyInitialized returns (uint256)
    {
        return CurrentScore[msg.sender].wins;
    }

    function getLosses() public view onlyInitialized returns (uint256)
    {
        return CurrentScore[msg.sender].losses;
    }

    function setResult(bool winner) public onlyInitialized
    {
        if(winner) {
            CurrentScore[msg.sender].wins = CurrentScore[msg.sender].wins + 1;
        } else {
            CurrentScore[msg.sender].losses = CurrentScore[msg.sender].losses + 1;
        }
        
        uint pos;

        if(topTen[0].initialized = false) {
            topTen[0] = CurrentScore[msg.sender];
        } else {
            for (uint i = 0; i < topTen.length; i++) {
                if((CurrentScore[msg.sender].wins - CurrentScore[msg.sender].losses)
                    > (topTen[i].wins - topTen[i].losses)) {
                    pos = i;
                    break;
                }
            }
            if(pos < topTen.length) {
                for (uint i = topTen.length; i > pos; i--) {
                    topTen[i] = topTen[i - 1];
                }
                topTen[pos] = CurrentScore[msg.sender];
            } else if(pos == topTen.length) {
                topTen[pos] = CurrentScore[msg.sender];
            }
        }
    }
}
