
let maze = createMaze(10)
console.log("drawing")
console.log(maze)
var tileSize = 20
makeGrid()
renderMaze(maze)

function renderMaze(maze){

    var canvas = document.getElementById("canvas2")

    maze.forEach(element => {
        var roomRectangle = document.createElement("div")
        roomRectangle.classList.add("room")
        roomRectangle.innerHTML = maze.indexOf(element)
        roomRectangle.style.height = element.size.h * tileSize+"px"
        roomRectangle.style.width = element.size.w * tileSize+"px"
        roomRectangle.style.top = element.position.y * tileSize+"px";
        roomRectangle.style.left = element.position.x * tileSize+"px";

        roomRectangle.style.marginTop = -((element.size.h/2) * tileSize)+"px";
        roomRectangle.style.marginLeft = -((element.size.w/2) * tileSize)+"px";
        

        canvas.appendChild(roomRectangle)
    });

}


function makeGrid(){
    var grid = document.getElementById("grid")
    

    for(var row = 0 ; row < 50; row++){
        for(var col = 0 ; col < 50; col++){
            
            var tile = document.createElement("div")
            tile.classList.add("tile")
            tile.style.height = tileSize+"px"
            tile.style.width = tileSize+"px"
            tile.style.top = tileSize*row+"px"
            tile.style.left = tileSize*col+"px"

            grid.appendChild(tile)
        }
    }
}