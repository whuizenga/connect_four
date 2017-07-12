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

    }

    $(".game-square").on("click", function(event){
        $(this).css("background-color", "black");
    });
});