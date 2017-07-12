$(function() {
    var GameBoard = {
        // board = [
        //     [0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0],
        // ]
    };

    var ClickHander = {
    //     click = function(){
    //         $(".game-square").on("click", function(event){
    //     $(this).css("background-color", "black");
    // });
        }
    

    $(".game-square").on("click", function(event){
        $(this).css("background-color", "black");
    });

    var createBoard = function(){
        console.log("running function createBoard()");
        for(var i = 0; i < 7; i ++){
            console.log("creating new column");
            var $newColumn = $("<div>");
            for(var n = 0; n < 6; n++){
                console.log("creating new square");
                var $newSquare = $("<div>");
                $newSquare.addClass("game-square");
                $newColumn.append($newSquare);
            };
            $newColumn.addClass("game-column");
            $("#game-board").append($newColumn);
        };
    };

    createBoard();
});