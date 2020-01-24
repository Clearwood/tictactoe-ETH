
class TicTacToe
{
    gameOver = false;
    board;
    turns = 0;
    
    tokens = 
    {
        EMPTY: '_',
        FU: 'fu',
        S: 'student',
        DRAW: 'draw',
    } //tokens

    tokenStudent = this.tokens.S;
    tokenFU = this.tokens.FU;

    
    constructor()
    {
        this.board = new Array(this.getSize());
        for(var i = 0; i < this.getSize(); i++)
        {
            this.board[i] = new Array(this.getSize());
            this.board[i].fill(this.tokens.EMPTY);
        }
    }  //constructor()
    
    
    getSize()
    {
        return 3;
    }
    
    
    gameWon()
    {
        var currentToken;
        var broke;

         // horizontal win
        for(var i = 0; i < this.getSize(); i++)
        {
            broke = false;
            currentToken = this.board[i][0];

            if(currentToken == this.tokens.EMPTY)
                continue;
            
            for(var j = 1; j < this.getSize(); j++)
            {
                if(this.board[i][j] != currentToken)
                {
                    broke = true;
                    break;
                }
            }
            
            if(!broke && currentToken != this.tokens.EMPTY)
                return currentToken;
        }

         // vertical win
        for(var i = 0; i < this.getSize(); i++)
        {
            broke = false;
            currentToken = this.board[0][i];
            
            if(currentToken == this.tokens.EMPTY)
                continue;

            for(var j = 1; j < this.getSize(); j++)
            {
                if(this.board[j][i] != currentToken)
                {
                    broke = true;
                    break;
                }
            }

            if(!broke && currentToken != this.tokens.EMPTY)
                return currentToken;
        }

        // diagonal win
        broke = false;
        currentToken = this.board[0][0];
        for(var i = 1; i < this.getSize(); i++)
        {
            if(this.board[i][i] != currentToken)
            {
                broke = true;
                break;
            }
        }
        
        if(!broke && currentToken != this.tokens.EMPTY)
            return currentToken;

        // diagonal win 2
        broke = false;
        currentToken = this.board[this.getSize() - 1][0];
        for(var i = 1; i < this.getSize(); i++)
        {
            if(this.board[this.getSize() - i - 1][i] != currentToken)
            {
                broke = true;
                break;
            }
        }
        
        if(!broke && currentToken != this.tokens.EMPTY)
            return currentToken;

        if(this.isDraw())
            return this.tokens.DRAW;
        
        return 'continue';
    }  //gameWon()


    isDraw()
    {
        return this.turns == this.getSize() ** 2;

    }


    isGameOver()
    {
    	if(this.gameOver)
    		return true;

        if(this.gameWon() == 'continue')
        	return false;

        this.gameOver = true;
        return true;
    }

    
    setMove(id, token)
    {
        var location = id.split("");
        var x = parseInt(location[0]) - 1;
        var y = parseInt(location[1]) -1;
        this.board[x][y] = token;
        this.turns++;
    }  //setMove()
}


// ===================================================

$(document).ready(function()
{
    var ttt = new TicTacToe();

    window.setTimeout(function ()
    {
        $('#message').removeClass('fadeInUp');
    }, 1000); // remove animation so it won't affect submenu


    $("td").on("click", function()
    {
        if (ttt.gameOver)
        {
            $("td").unbind("click");
            return;
        }
        
        var marked = $(this); // get the square that player selects

        if (marked.hasClass(ttt.tokenStudent) || marked.hasClass(ttt.tokenFU)) 
        {
         // if the square has already been selected then alert else markes the square
            alert("Please choose another square!")
            return;
        }
            
        $("#message").text("It's your turn!"); // change the prompt message
        marked.addClass(ttt.tokenStudent).addClass("animated bounceIn"); // place the token "X"
        ttt.setMove(marked.attr('id'), ttt.tokenStudent);

        if(!ttt.isDraw())
    	{
    		var mm = new MiniMax(ttt, 4);
	        var move = mm.miniMaxMove();
	        move.x++;
	        move.y++;
	        var id = "" + move.x + move.y;
    		$("#"+id).addClass(ttt.tokenFU).addClass("animated bounceIn");
        	ttt.setMove(id, ttt.tokenFU);
		}
        
        switch(ttt.gameWon())
        {
            case ttt.tokenStudent:
                $("#message").text("Player wins!");
                ttt.gameOver = true; // game is ended
                return;
            case ttt.tokenFU:
                $("#message").text("MiniMax wins!");
                ttt.gameOver = true; // game is ended
                return;
            case ttt.tokens.DRAW:
                $("#message").text("It's a draw!");
                ttt.gameOver = true; // game is ended
                return;
            default:
        }
    });  //onClick()


    $("#restart").on("click", function()
    {
    });
});  //ready()


// ===================MiniMax class================================

class MiniMax
{
    maxDepth;
    ttt;
    
    constructor(tttInstance, maxDepth)
    {
        this.ttt = tttInstance;
        this.maxDepth = maxDepth;
    }
    
    
    setBoard(x, y, move)
    {
        this.ttt.turns++;
        this.ttt.board[x][y] = move;
    }
    
    
    resetBoard(i, j)
    {
        this.ttt.turns--;
        this.ttt.board[i][j] = this.ttt.tokens.EMPTY;
    }
    
    
    miniMaxMove()
    {
        if(this.ttt.isGameOver())
            return new MoveTyp(-1, -1, 0);
        var bestMove = this.getBestMove(this.ttt.tokenFU, 0);
        return bestMove;
    }  //miniMaxMove()

    
    getBestMove(token, depth)
    {
        var val = this.ttt.gameWon();  //detirmine who won and return the base case accordingly
        
        if(val == this.ttt.tokenFU)
            return new MoveTyp(-1, -1, 0.1);
        else if (val == this.ttt.tokenStudent)
            return new MoveTyp(-1, -1, -0.1);
        else if (val == this.ttt.tokens.DRAW || this.maxDepth == depth)  // draw or max recurion reached
            return new MoveTyp(-1, -1, 0);
        
        var moves = [];  //store all the moves here and return the move with the highest score
        var currMove;

        for(var i = 0; i < this.ttt.getSize(); i++)
        {
            for(var j = 0; j < this.ttt.getSize(); j++)
            {
                if(this.ttt.board[i][j] == this.ttt.tokens.EMPTY)
                {
                    currMove = new MoveTyp(i, j ,0);
                    this.setBoard(i, j, token);
                    
                    if(token == this.ttt.tokenFU)  // miniMax's turn
                        currMove.score = this.getBestMove(this.ttt.tokenStudent, depth+1).score;
                    else
                        currMove.score = this.getBestMove(this.ttt.tokenFU, depth+1).score;
                    
                    moves.push(currMove);
                    this.resetBoard(i, j);  // reset the board
                }
            }
        }
        
        var bestMove = 0;
        if(token == this.ttt.tokenFU)
        {
            var bestScore = -(this.ttt.getSize()**2);
            for(var i = 0; i < moves.length; i++)
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
        var bestScore = this.ttt.getSize()**2;
            for(var i = 0; i < moves.length; i++)
            {
                if(moves[i].score < bestScore)
                {
                    bestMove = i;
                    bestScore = moves[i].score;
                }
            }
        }
        if(moves.length == 0)
        	return new MoveTyp(-1, -1, 0);

        return moves[bestMove];
    }
}  //getBestMove()


class MoveTyp
{
    x;
    y;
    score = 0;
    
    constructor(x, y, score)
    {
        this.x = x;
        this.y = y;
        this.score = score;
    }
    
    printer()
    {
        console.log("chose: x = "+this.x+", y = "+this.y+", score = "+this.score);
    }
}
