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
        $playerOne.text("Player 1");
        $(".game-info").append($playerOne);

        var $playerTwo = $("<h1>");
        $playerTwo.addClass("second-player player");
        $playerTwo.text("Player 2");
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
        });
        $(".select-simon").on("click", function () {
            createSimon();
        });
    };

    startHere();

    //----|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-PUT THE SIMON STUFF UNDER HERE -|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|----

    var SimonController = {
        colors: ["green", "red", "yellow", "blue"],
        arrayThePlayerMustExecute: [],
        arrayThePlayerHasExecuted: [],
        speed: 1000,
        simonIsSaying: false,
        startGame: function () {
            console.log("begin the game!!");
            SimonController.simonIsSaying = true;
            SimonController.simonSays();
        },
        simonSays: function () {
            var randomColor = SimonController.colors[Math.floor(Math.random() * SimonController.colors.length)];
            SimonController.arrayThePlayerMustExecute.push(randomColor);
            SimonController.arrayThePlayerHasExecuted.splice(0, SimonController.arrayThePlayerHasExecuted.length);
            console.log(SimonController.arrayThePlayerMustExecute);
            console.log(SimonController.arrayThePlayerHasExecuted);
            SimonController.displayColors(0);
        },
        displayColors: function (round) {
            var index = round;
            if (index > 0) {
                $(".simon-" + SimonController.arrayThePlayerMustExecute[index - 1]).css("opacity", "1");
            }
            if (index <= SimonController.arrayThePlayerMustExecute.length) {
                $(".simon-" + SimonController.arrayThePlayerMustExecute[index]).css("opacity", "0.3");
                setTimeout(function(){
                    $(".simon-"+SimonController.arrayThePlayerMustExecute[index]).css("opacity","0.7");
                }, SimonController.speed-100);
                setTimeout(function () {
                    index += 1;
                    SimonController.displayColors(index);
                    return;
                }, SimonController.speed);
            } else {
                SimonController.simonIsSaying = false;
                console.log("It is now time for the player to try to repeat the segment")
                return;
            }
        },
        playerTurn: function () {
            if (!SimonController.simonIsSaying) {
                $(".simon-green").on("click", function (event) {
                    if (!SimonController.simonIsSaying) {
                    SimonController.arrayThePlayerHasExecuted.push("green");
                    SimonController.checkArrays();
                 } });
                $(".simon-red").on("click", function (event) {
                    if (!SimonController.simonIsSaying) {
                    SimonController.arrayThePlayerHasExecuted.push("red");
                    SimonController.checkArrays();
                 } });
                $(".simon-yellow").on("click", function (event) {
                    if (!SimonController.simonIsSaying) {
                    SimonController.arrayThePlayerHasExecuted.push("yellow");
                    SimonController.checkArrays();
                 } });
                $(".simon-blue").on("click", function (event) {
                    if (!SimonController.simonIsSaying) {
                    SimonController.arrayThePlayerHasExecuted.push("blue");
                    SimonController.checkArrays();
                 } });
            }
        },
        checkArrays: function(){
            if(SimonController.arrayThePlayerHasExecuted > SimonController.arrayThePlayerMustExecute){
                console.log("HOW DID YOU GET HERE");
            }
            for(var i = 0; i < SimonController.arrayThePlayerHasExecuted.length; i++){
                if(SimonController.arrayThePlayerHasExecuted[i] !== SimonController.arrayThePlayerMustExecute[i]){
                    console.log("DEFEATED!!");
                    return;
                }
            }
            if(SimonController.arrayThePlayerHasExecuted.length === SimonController.arrayThePlayerMustExecute.length){
                SimonController.simonSays();
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
        $newGameButton.text("Click Here to Start");
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
        $(".logo").attr("src", "images/simonlogo.jpg");
        SimonController.playerTurn();
    };
});