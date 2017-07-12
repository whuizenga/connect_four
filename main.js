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
            for (i = 0; i < GameBoard.board.length; i++) {
                for (n = 0; n < GameBoard.board[i].length; n++) {
                    if (GameBoard.board[i][n] === 1) {
                        var $squareToEdit = $("[column=" + i + "][row=" + n + "]");
                        $squareToEdit.css("background-color", "black");
                    }
                }
            }
        },

        testVictory: function () {
            Victory.checkHorizontal(this.turn);
            Victory.checkVerticle(this.turn);
            Victory.checkDiagonal(this.turn);
        }
    };

    var Victory = {
        checkHorizontal: function (player) {
            // for (var i = 0; i < GameBoard.board.length; i++) {
            //     for (var n = GameBoard.board[i].length - 1; n >= 0; n--){
            //         if(GameBoard.board[i][n] === player &&
                    
            //     }
            // }
        },
        checkVerticle: function (player) {
            for (var i = 0; i < GameBoard.board.length; i++) {
                for (var n = GameBoard.board[i].length - 1; n >= 3; n--) {
                    if (GameBoard.board[i][n] === player &&
                        GameBoard.board[i][n - 1] === player &&
                        GameBoard.board[i][n - 2] === player &&
                        GameBoard.board[i][n - 3] === player) {
                            var $winner = $("<h1>");
                            $winner.html("Player " + player + " is the winner!!");
                            $("#game-board").prepend($winner);
                    }
                }
            }
        },
        checkDiagonal: function (player) { },
    }
    var ClickHander = {
        click: function (column) {
            var getTarget = column;
            GameBoard.dropChip(getTarget);
        }
    };

    var createBoard = function () {
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
                ClickHander.click(this);
            });
            $("#game-board").append($newColumn);
        };
    };

    createBoard();
});