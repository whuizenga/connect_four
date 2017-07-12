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
            for( var i = columnExecuteDrop.length-1; i >= 0; i--){
                if(columnExecuteDrop[i] === 0){
                    columnExecuteDrop[i] = GameBoard.turn;
                    GameBoard.handleColor();
                    console.log(GameBoard.board[columnToDrop]);
                    return;
                }
            }
        },
        handleColor: function(){
            for(i = 0; i < GameBoard.board.length; i++){
                for(n = 0; n < GameBoard.board[i].length; n ++){
                    if(GameBoard.board[i][n] === 1){
                        var $squareToEdit = $("[column="+i+"][row="+n+"]");
                        console.log($squareToEdit);
                        $squareToEdit.css("background-color", "black");
                    }
                }
            }
        }
    };

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