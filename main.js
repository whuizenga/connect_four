$(function () {
    var GameBoard = {
        board: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ],

        //Designates which player is taking a turn. 1 if player 1 turn, 2 if player 2 turn.
        turn: 1,
        
        dropChip: function(column){
            var columnToDrop = column.data("column");
            console.log(columnToDrop);
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
                $newSquare.data("column",i);
                $newSquare.data("row", n);
                $newColumn.append($newSquare);
            };
            $newColumn.data("column",i);
            $newColumn.addClass("game-column");
            $newColumn.on("click", function (event) {
                ClickHander.click(this);
            });
            $("#game-board").append($newColumn);
        };
    };

    createBoard();
});