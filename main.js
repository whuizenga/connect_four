$(function () {
    var GameBoard = {
        board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],

        //Designates which player is taking a turn. 1 if player 1 turn, 2 if player 2 turn.
        turn: 1,
        gameComplete: false,
        playerOneScore: 0,
        playerTwoScore: 0,

        dropChip: function (column) {
            var columnToDrop = $(column).attr("Gcolumn");
            var columnExecuteDrop = GameBoard.board[columnToDrop];
            for (var i = columnExecuteDrop.length - 1; i >= 0; i--) {
                if (columnExecuteDrop[i] === 0) {
                    columnExecuteDrop[i] = GameBoard.turn;
                    GameBoard.handleColor();
                    GameBoard.testVictory();
                    return;
                }
            }
        },
        handleColor: function () {
            //COME BACK TO THIS AND CLEAN IT UP NOW THAT YOU MADE IT WORK!
            if (this.turn === 1) {
                for (i = 0; i < GameBoard.board.length; i++) {
                    for (n = 0; n < GameBoard.board[i].length; n++) {
                        if (GameBoard.board[i][n] === this.turn) {
                            var $squareToEdit = $("[column=" + i + "][row=" + n + "]");
                            $squareToEdit.css("background-color", "black");
                        }
                    }
                }
            } else if (this.turn === 2) {
                for (i = 0; i < GameBoard.board.length; i++) {
                    for (n = 0; n < GameBoard.board[i].length; n++) {
                        if (GameBoard.board[i][n] === this.turn) {
                            var $squareToEdit = $("[column=" + i + "][row=" + n + "]");
                            $squareToEdit.css("background-color", "red");
                        }
                    }
                }
            }
            //!!!CLEAN UP THE ABOVE FUNCTION!
        },

        changeTurns: function () {
            if (this.turn === 1) {
                this.turn = 2;
            } else {
                this.turn = 1;
            }
            ClickHandler.playerDisplay(this.turn);
        },

        testVictory: function () {
            Victory.checkHorizontal(this.turn);
            Victory.checkVerticle(this.turn);
            Victory.checkDiagonal(this.turn);
        }
    };

    var Victory = {
        checkHorizontal: function (player) {
            for (var i = 0; i < GameBoard.board.length - 3; i++) {
                for (var n = GameBoard.board[i].length - 1; n >= 0; n--) {
                    if (GameBoard.board[i][n] === player &&
                        GameBoard.board[i + 1][n] === player &&
                        GameBoard.board[i + 2][n] === player &&
                        GameBoard.board[i + 3][n] === player) {
                        this.callVictory(player);
                        return;
                    }
                }
            }
        },
        checkVerticle: function (player) {
            for (var i = 0; i < GameBoard.board.length; i++) {
                for (var n = GameBoard.board[i].length - 1; n >= 3; n--) {
                    if (GameBoard.board[i][n] === player &&
                        GameBoard.board[i][n - 1] === player &&
                        GameBoard.board[i][n - 2] === player &&
                        GameBoard.board[i][n - 3] === player) {
                        this.callVictory(player);
                        return;
                    }
                }
            }
        },
        checkDiagonal: function (player) {
            for (var i = 0; i < GameBoard.board.length - 3; i++) {
                for (var n = GameBoard.board[i].length - 1; n >= 3; n--) {
                    if (GameBoard.board[i][n] === player &&
                        GameBoard.board[i + 1][n - 1] === player &&
                        GameBoard.board[i + 2][n - 2] === player &&
                        GameBoard.board[i + 3][n - 3] === player) {
                        this.callVictory(player);
                        return;
                    }
                }
            }
            for (var i = GameBoard.board.length - 1; i >= 3; i--) {
                for (var n = GameBoard.board[i].length - 1; n >= 3; n--) {
                    if (GameBoard.board[i][n] === player &&
                        GameBoard.board[i - 1][n - 1] === player &&
                        GameBoard.board[i - 2][n - 2] === player &&
                        GameBoard.board[i - 3][n - 3] === player) {
                        this.callVictory(player);
                        return;
                    }
                }
            }
        },
        callVictory(player) {
            var $winner = $("<h1>");
            $winner.html("Player " + player + " is the winner!!");
            $winner.addClass("player");
            $(".game-info").append($winner);
            GameBoard.gameComplete = true;
            if(player === 1){
                GameBoard.playerOneScore += 1;
            } else {
                GameBoard.playerTwoScore += 1;
            }

            var $resetGame = $("<div>");
            $resetGame.addClass("reset-button");
            $resetGame.text("Reset");
            $resetGame.on("click", function (event) {
                ClickHandler.reset(this);
            });
            $(".game-info").append($resetGame);
        }
    }

    var ClickHandler = {
        click: function (column) {
            if (!GameBoard.gameComplete) {
                var getTarget = column;
                GameBoard.dropChip(getTarget);
                GameBoard.changeTurns();
            }
        },
        playerDisplay: function (turn) {
            if (turn === 1) {
                $(".player").css("border", "none");
                $(".first-player").css("border", "3px solid yellow");
            }
            if (turn === 2) {
                $(".player").css("border", "none");
                $(".second-player").css("border", "3px solid yellow");
            }
            if (GameBoard.gameComplete) {
                $(".player").css("border", "none");
            }
        },
        reset: function (reset) {
            $("#game-board").empty();
            $(".game-info").empty();
            GameBoard.gameComplete = false;
            GameBoard.board = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]];
            createBoard();
        },
        gameVisibility: function () {
            $("#game-board").css("visibility", "visible");
            $(".game-info").css("visibility", "visible");
            $(".logo").css("visibility", "visible");
            $(".game").css("display", "none");
            $(".welcome").css("display", "none");
        }
    };

    var createBoard = function () {
        var $playerOne = $("<h1>");
        $playerOne.addClass("first-player player");
        $playerOne.text("Player 1: " + GameBoard.playerOneScore + " win(s).");
        $(".game-info").append($playerOne);

        var $playerTwo = $("<h1>");
        $playerTwo.addClass("second-player player");
        $playerTwo.text("Player 2: " + GameBoard.playerTwoScore + " win(s).");
        $(".game-info").append($playerTwo);

        var $gameRules = $("<p>");
        $gameRules.text("Objective: Be the first player to create a line of 4 square either horizontally, vertically, or diagonally.");
        $gameRules.addClass("player");
        $(".game-info").append($gameRules);

        for (var i = 0; i < 7; i++) {
            var $newColumn = $("<div>");
            for (var n = 0; n < 6; n++) {
                var $newSquare = $("<div>");
                $newSquare.addClass("game-square");
                $newSquare.attr("column", i);
                $newSquare.attr("row", n);
                $newColumn.append($newSquare);
            };
            $newColumn.attr("Gcolumn", i);
            $newColumn.addClass("game-column");
            $newColumn.on("click", function (event) {
                ClickHandler.click(this);
            });
            $("#game-board").append($newColumn);
        };

        ClickHandler.gameVisibility();
        ClickHandler.playerDisplay(GameBoard.turn);
    };

    var startHere = function () {
        $(".select-connect4").on("click", function () {
            createBoard();
            $(".game-container").css("display","flex");
            document.title = "Connect 4";
        });
        $(".select-simon").on("click", function () {
            createSimon();
            $(".game-container").css("display", "flex");
            document.title = "Simon";
        });
        //createjs.Sound.registerSounds(SimonSound.sounds, SimonSound.audioPath);
    };

    startHere();

    //----|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-PUT THE SIMON STUFF UNDER HERE -|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|----

    var SimonController = {
        colors: ["green", "red", "yellow", "blue"],
        arrayThePlayerMustExecute: [],
        arrayThePlayerHasExecuted: [],
        speed: 1000,
        simonIsSaying: false,
        playerCanClick: false,
        startGame: function () {
            SimonController.simonIsSaying = true;
            SimonController.simonSays();
        },
        simonSays: function () {
            var randomColor = SimonController.colors[Math.floor(Math.random() * SimonController.colors.length)];
            SimonController.arrayThePlayerMustExecute.push(randomColor);
            SimonController.arrayThePlayerHasExecuted.splice(0, SimonController.arrayThePlayerHasExecuted.length);
            //console.log(SimonController.arrayThePlayerMustExecute);
            SimonController.displayColors(0);
        },
        displayColors: function (round) {
            var index = round;
            if (index > 0) {
                $(".simon-" + SimonController.arrayThePlayerMustExecute[index - 1]).css("opacity", "1");
            }
            if (index <= SimonController.arrayThePlayerMustExecute.length) {
                $(".simon-" + SimonController.arrayThePlayerMustExecute[index]).css("opacity", "0.3");
                SimonController.playSound(index);
                setTimeout(function(){
                    $(".simon-"+SimonController.arrayThePlayerMustExecute[index]).css("opacity","0.7");
                    }, SimonController.speed-100);
                setTimeout(function () {
                    index += 1;
                    SimonController.displayColors(index);
                    return;
                    }, SimonController.speed);
            } else {
                $(".game-info").empty();
                SimonController.simonIsSaying = false;
                    var $newMessage = $("<h1>");
                    $newMessage.text("Now repeat the sequence.");
                    $(".game-info").append($newMessage);
                    this.playerCanClick = true;
                return;
            }
        },
        playerTurn: function () {
            if (!SimonController.simonIsSaying) {
                $(".simon-green").on("click", function (event) {
                    if (SimonController.playerCanClick) {
                    SimonController.arrayThePlayerHasExecuted.push("green");
                    $(".simon-green").css("opacity","0.7");
                    setTimeout(function(){
                        $(".simon-green").css("opacity","1");
                        }, 150);
                    SimonController.checkArrays();
                    document.getElementById("greenTone").play();
                 } });
                $(".simon-red").on("click", function (event) {
                    if (SimonController.playerCanClick) {
                    SimonController.arrayThePlayerHasExecuted.push("red");
                    $(".simon-red").css("opacity","0.7");
                    setTimeout(function(){
                        $(".simon-red").css("opacity","1");
                        }, 150);
                    SimonController.checkArrays();
                    document.getElementById("redTone").play();
                 } });
                $(".simon-yellow").on("click", function (event) {
                    if (SimonController.playerCanClick) {
                    SimonController.arrayThePlayerHasExecuted.push("yellow");
                    $(".simon-yellow").css("opacity","0.7");
                    setTimeout(function(){
                        $(".simon-yellow").css("opacity","1");
                        }, 150);
                    SimonController.checkArrays();
                    document.getElementById("yellowTone").play();
                 } });
                $(".simon-blue").on("click", function (event) {
                    if (SimonController.playerCanClick) {
                    SimonController.arrayThePlayerHasExecuted.push("blue");
                    $(".simon-blue").css("opacity","0.7");
                    setTimeout(function(){
                        $(".simon-blue").css("opacity","1");
                        }, 150);
                    SimonController.checkArrays();
                    document.getElementById("blueTone").play();
                 } });
            }
        },
        checkArrays: function(){
            for(var i = 0; i < SimonController.arrayThePlayerHasExecuted.length; i++){
                if(SimonController.arrayThePlayerHasExecuted[i] !== SimonController.arrayThePlayerMustExecute[i]){
                    var $newLostMessage = $("<h1>");
                    var $newScoreMessage = $("<h1>");
                    $newLostMessage.text("Wrong, you lose!");
                    $newScoreMessage.text("Score: "+(SimonController.arrayThePlayerMustExecute.length-1));
                    $(".game-info").append($newLostMessage);
                    $(".game-info").append($newScoreMessage);
                    this.playerCanClick = false;
                    return;
                }
            }
            if(SimonController.arrayThePlayerHasExecuted.length === SimonController.arrayThePlayerMustExecute.length){
                setTimeout(function(){
                    SimonController.simonSays();}, 500);
                    $(".game-info").empty();
                    var $newMessage = $("<h1>");
                    $newMessage.text("Simon says..");
                    $(".game-info").append($newMessage);
                    this.playerCanClick = false;

                    if(SimonController.arrayThePlayerMustExecute.length > 5 && SimonController.speed > 200){
                        SimonController.speed = 1000 - ((SimonController.arrayThePlayerMustExecute.length-5)*50);
                    }
            }
        },
        playSound: function(index){
            switch(SimonController.arrayThePlayerMustExecute[index]){
                case "red":
                    document.getElementById("redTone").play();
                    break;
                case "yellow":
                    document.getElementById("yellowTone").play();
                    break;
                case "green":
                    document.getElementById("greenTone").play();
                    break;
                case "blue":
                    document.getElementById("blueTone").play();
                default:
                    console.log("error in array");
        }
        }
    }

    var createSimon = function () {
        var colors = ["green", "red", "yellow", "blue"];
        ClickHandler.gameVisibility();
        $simonDiv = $("<div>");
        $simonDiv.addClass("master-simon");
        var $newGameButton = $("<div>");
        $newGameButton.addClass("reset-button");
        $newGameButton.text("Start");
        $(".game-info").append($newGameButton);
        $newGameButton.on("click", function (event) {
            SimonController.startGame();
        });

        for (i = 0; i < 4; i++) {
            $newDiv = $("<div>");
            $newDiv.addClass("simon-div");
            $newDiv.addClass("simon-" + colors[i]);
            $newDiv.css("background-color", colors[i]);
            $simonDiv.append($newDiv);
        }
        $("#game-board").append($simonDiv);
        $simonDiv.css("flex-wrap", "wrap");
        $(".logo").attr("src", "images/simonlogo2.png");
        SimonController.playerTurn();
    };
});