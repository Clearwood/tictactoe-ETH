var isOver = false; // see whether game is ended
const SIZE = 3; //3x3 grid default
var turns = 0;
var token1 = 'student'
var token2 = 'fu'
var board;
var MaxDepth = 2;

const tokens = {
    EMPTY: 'E',
    X: 'fu',
    O: 'student'
}

function initializeBoard(){
    board = new Array(SIZE);
    for(var i = 0; i < SIZE; i++)
    {
        board[i] = new Array(SIZE);
        board[i].fill(tokens.EMPTY);
    }
}


function theWinnerIs()
{
    if(turns == SIZE ** 2)
        return "draw";
    var currentToken;
    var broke;
    
     // horizontal win
    for(var i = 0; i < SIZE; i++)
    {
        broke = false;
        currentToken = board[i][0];
        if(currentToken == tokens.EMPTY)
            continue;
        for(var j = 1; j < SIZE; j++)
        {
            if(board[i][j] != currentToken){
                broke = true;
                break;
            }
        }
        if(!broke && currentToken != tokens.EMPTY)
            return currentToken;
    }

     // vertical win
    for(var i = 0; i < SIZE; i++)
    {
        broke = false;
        currentToken = board[0][i];
        if(currentToken == tokens.EMPTY)
            continue;
        for(var j = 1; j < SIZE; j++){
            if(board[j][i] != currentToken){
                broke = true;
                break;
            }
        }
        if(!broke && currentToken != tokens.EMPTY)
            return currentToken;
    }

    // diagonal win
    broke = false;
    currentToken = board[0][0];
    for(var i = 1; i < SIZE; i++){
        if(board[i][i] != currentToken){
            broke = true;
            break;
        }
    }
    if(!broke && currentToken != tokens.EMPTY)
        return currentToken;

    // diagonal win 2
    broke = false;
    currentToken = board[SIZE - 1][0];
    for(var i = 1; i < SIZE; i++){
        if(board[SIZE - i - 1][i] != currentToken){
            broke = true;
            break;
        }
    }
    if(!broke && currentToken != tokens.EMPTY)
        return currentToken;

    return "noOne";
}

function setMove(id, token){
    var location = id.split("");
    x = parseInt(location[0]) - 1;
    y = parseInt(location[1]) -1;
    board[x][y] = token;
}







// ===================all the functions below================================

$(document).ready(function()
{
    initializeBoard();
    // load game

    window.setTimeout(function ()
        {
        $('#message').removeClass('fadeInUp');
        }, 1000); // remove animation so it won't affect submenu


    $("td").on("click", function()
    {
         if (isOver)
            return; // if game is ended, clicks become invalid

//                 $("td").unbind("click");
         var marked = $(this); // get the square that player selects
        // classes x and o
         if (marked.hasClass(token1) || marked.hasClass(token2)) {
         // if the square has already been selected then alert else markes the square
            alert("Please choose another square!")
            return;
     }

// first see which turn
         if (turns % 2 === 0) {
            $("#message").text("It's MiniMax's turn!"); // change the prompt message
            marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
            setMove(marked.attr('id'), token1);
            
         }
         else
               {
               $("#message").text("It's Player's turn!"); // change the prompt message
               marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
               MiniMaxMove();
               }

         turns++; //player2's turn
         isOver = true; // game is ended
         switch(theWinnerIs()){
            case tokens.O:
                $("#message").text("Player wins!");
                return;
            case "draw":
                $("#message").text("It's a draw!");
                return;
            default:
                isOver = false; // game is ended
        }
    });// all the moves --->AI mode, function ends


    var restart = function()
    {
        turns = 0;
        isOver = false;
        $("td").removeClass(gameData.token1).removeClass(gameData.token2);
        $("#message").text("Let's play the game! Player1 first.")
    };

    $("#restart").on("click", function()
    {
        restart();
 
    }); // START button click event, reset game

});
// ===================MiniMax functions================================
                  


function setBoard(x, y, move){
    // index out of range
    if(x < 0 || y < 0 || x >= SIZE || y >= SIZE)
        return -1;
    
    if(board[x][y] != tokens.EMPTY)
        return -2;
    
    board[x][y] = move;
    return 1;
}

function resetMove(i, j)
{
//    console.log(board+", "+i+", "+ j);
    board[i][j] = tokens.EMPTY;
}
                  



function MiniMaxMove()
{
    if(turns == SIZE ** 2)
        return;  // game over
    console.log("gonna start mini");
    var bestMove = getBestMove(tokens.X, 0);
    console.log(bestMove);
//    setBoard(bestMove.x, bestMove.y, tokens.X);
}



function getBestMove(token, depth){
    
    val = theWinnerIs();  //detirmine who won and return the base case accordingly
    
    if(val == tokens.X)
        return {'score': 100};
    else if (val == tokens.O)
        return {'score': -100};
    else if (val == 'draw')  //draw
        return {'score': 0};
    
    if(MaxDepth == depth)  // max recurion reached
        return {'score': 0};
    
    var moves = [];  //store all the moves here and return the move with the highest score
    
    for(i = 0; i < SIZE; i++){
        for(j = 0; j < SIZE; j++){
            console.log(i+", "+ j);
            if(board[i][j] == tokens.EMPTY){
                var currMove = {'x': i, 'y': j, 'score': 0};
                
                setBoard(i, j, token);

//                if(token == tokens.X)  // miniMax's turn
//                    currMove.score = getBestMove(tokens.O, depth+1).score;
//                else
 //                   currMove.score = getBestMove(tokens.X, depth+1).score;
                moves.push(currMove);
                resetMove(i, j);  // reset the board
            }
        }
    }
    
    bestMove = 0;
    if(token == tokens.X)
    {
        bestScore = -1000000000;
        for(i = 0; i < moves.length; i++)
        {
            if(moves[i].score > bestScore)
            {
                bestMove = i;
                bestScore = moves[i].score;
            }
        }
    }
    else
    {
        bestScore = 1000000000;
        for(i = 0; i < moves.length; i++)
        {
            if(moves[i].score < bestScore)
            {
                bestMove = i;
                bestScore = moves[i].score;
            }
        }
    }
    
    return moves[bestMove];
}
