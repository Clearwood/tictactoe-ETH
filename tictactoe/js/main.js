var isOver = false; // see whether game is ended
var size = 3; //3x3 grid default
var turns = 0;
var token1 = 'student'
var token2 = 'fu'
var board;
const tokens = {
  EMPTY: ' ',
  X: 'fu',
  O: 'student',
  MINMAX: 'MN'
}

function initializeBoard(){
  board = new Array(size);
  for(var i = 0; i < board.length; i++){
    board[i] = new Array(size);
    board[i].fill(tokens.EMPTY);
  }
}


function theWinnerIs()
{
  if(turns == size ** 2)
    return "draw";
  var currentToken;
  var broke;
  for(var i = 0; i < board.length; i++)
  {
    broke = false;
    currentToken = board[i][0];
    if(currentToken == tokens.EMPTY)
        continue;
    for(var j = 1; j < board.length; j++)
    {
      if(board[i][j] != currentToken){
        broke = true;
        break;
      }
    }
    if(!broke)
      return currentToken; // horizontal win
    }

//---------------------

 for(var i = 0; i < board.length; i++)
 {
   broke = false;
    currentToken = board[0][i];
    if(currentToken == tokens.EMPTY)
        continue;
    for(var j = 1; j < board.length; j++){
      if(board[j][i] != currentToken){
        broke = true;
        break;
      }
    }

    if(!broke)
      return currentToken; // vertical win

  }
//---------------------
  broke = false;
  currentToken = board[0][0];
  for(var i = 1; i < board.length; i++){
    if(board[i][i] != currentToken){
      broke = true;
      break;
    }
  }
  if(!broke)
    return currentToken;
//---------------------
    broke = false;
  currentToken = board[size-1][0];
  for(var i = 1; i < board.length; i++){
    if(board[size-i-1][i] != currentToken){
      broke = true;
      break;
    }
  }
  if(!broke)
    return currentToken;
    //---------------------
  return "noOne";
}

function setMove(id, token){
  var location = id.split("");
  x = parseInt(location[0]) - 1;
  y = parseInt(location[1]) -1;
  board[x][y] = token;
}







// ===================all the functions below================================

$(document).ready(function() {
 initializeBoard();
  // load game

  window.setTimeout(function () {
    $('#message').removeClass('fadeInUp');
  }, 1000); // remove animation so it won't affect submenu


  $("td").on("click", function() {
    if (isOver) {
      return;
    } // if game is ended, clicks become invalid
    $("td").unbind("click");
    var marked = $(this); // get the square that player selects

    // classes x and o
    if (marked.hasClass(token1) || marked.hasClass(token2)) {
      // if the square has already been selected then alert else markes the square
      alert("Please choose another square!")
      return;
    }

    // first see which turn
    if (turns % 2 === 0) {
      $("#message").text("It's Player's turn!"); // change the prompt message
      marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
      setMove(marked.attr('id'), token1);
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



  var restart = function() {

    turns = 0;
    isOver = false;
    $("td").removeClass(gameData.token1).removeClass(gameData.token2);
   $("#message").text("Let's play the game! Player1 first.")
  };

  $("#restart").on("click", function() {
    restart();
  }); // START button click event, reset game


  //==================================AI mode on======================================
    // all the moves ---> AI mode


//===========================all the check for WIN functions=============================



  //=====================================total check to win function===============================
  //=====================================take size (3 or 4) as an argument===============================

  var checkWin = function(moves, size) {
    var diagonal1 = diagArr(size, 0);
    var diagonal2 = diagArr(size, 1);

    if ( checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size) ) {
      return true;
    }
    return false;
  };


  //==================false or true array to check the situation of either "X" or "O"===============================================

  var boardCheck = function(token) {
    a1 = $("#11").hasClass(token);
    a2 = $("#12").hasClass(token);
    a3 = $("#13").hasClass(token);
    b1 = $("#21").hasClass(token);
    b2 = $("#22").hasClass(token);
    b3 = $("#23").hasClass(token);
    c1 = $("#31").hasClass(token);
    c2 = $("#32").hasClass(token);
    c3 = $("#33").hasClass(token);

    return [a1, a2, a3, b1, b2, b3, c1, c2, c3];
  };

///==================get the first empty square to fill an AI move===================================
  var checkEmpty = function() {
    var boardX = boardCheck(gameData.token1);
    var boardO = boardCheck(gameData.token2);
    var empty = [];

    for (var i = 0; i < boardX.length; i++) {
      empty[i] = boardX[i] || boardO[i];
    }
    return empty;
  }


}); // the end
