var toggle = false;
var isOver = false; // see whether game is ended
var size = 3; //3x3 grid default
var turns = 0;

// ===================all the functions below================================

$(document).ready(function() {

  // load game

  window.setTimeout(function () {
    $('#message').removeClass('fadeInUp');
  }, 1000); // remove animation so it won't affect submenu

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
    $("td").on("click", function() {
      if (isOver) {
        return;
      } // if game is ended, clicks become invalid



      var marked = $(this); // get the square that player selects
      // classes x and o
      if (marked.hasClass(token1) || marked.hasClass(token2)) {
        // if the square has already been selected then alert else markes the square
        alert("Please choose another square!")
        return;
      }

      // first see which turn
      if (turns % 2 === 0) {

        $("#message").text("It's Player's turn!") // change the prompt message

        marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"

        turns++; //player2's turn

        if (  ) {
          $("#message").text("Player wins!")
          isOver = true; // game is ended
          $("#player1 .num").text('' + );

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            return;
          } // players reach the last turn and not winning, it's a draw
          // $("#player2 .name").addClass("changecolor");
          // $("#player1 .name").removeClass("changecolor"); // change color to indicate current player
          $("#message").text("It's Player2's turn!")
          //normally switch to player O and change prompt message
        }


        if ( //computer wins ) {
          $("#message").text("Computer wins!")
          isOver = true;

        } else {

          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!")
            isOver = true;
            return;
          }

          $("#message").text("It's Player's turn!")
        }

    }
  });// all the moves --->AI mode, function ends
// }

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
