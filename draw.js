
let maze = createMaze(10)
console.log("drawing")
console.log(maze)
var tileSize = 20
makeGrid()
renderMaze(maze)

function renderMaze(maze){

    var canvas = document.getElementById("canvas2")

    maze.rooms.forEach(element => {

        var randomColor = {
            r:Math.random()*256,
            g:Math.random()*256,
            b:Math.random()*256
        }

        var roomRectangle = document.createElement("div")
        roomRectangle.classList.add("room")
        roomRectangle.innerHTML = maze.rooms.indexOf(element)
        roomRectangle.style.height = element.size.h * tileSize+"px"
        roomRectangle.style.width = element.size.w * tileSize+"px"
        roomRectangle.style.top = element.position.y * tileSize+"px";
        roomRectangle.style.left = element.position.x * tileSize+"px";

        roomRectangle.style.marginTop = -((Math.floor( element.size.h/2)) * tileSize)+"px";
        roomRectangle.style.marginLeft = -((Math.floor(element.size.w/2)) * tileSize)+"px";
        roomRectangle.style.borderColor = "rgb("+randomColor.r+", "+randomColor.g+", "+randomColor.b+")"

        canvas.appendChild(roomRectangle)

        var marginTiles = element.tiles.filter(e=>{
            return e.tileType == 1
        })

        marginTiles.forEach(corridorTile=>{
            var corridorRectangle = document.createElement("div")
            corridorRectangle.classList.add("room")
    
            corridorRectangle.style.height = tileSize+"px"
            corridorRectangle.style.width = tileSize+"px"
            corridorRectangle.style.top = corridorTile.y * tileSize+"px";
            corridorRectangle.style.left = corridorTile.x * tileSize+"px";
            corridorRectangle.style.opacity = 0.2
            corridorRectangle.style.backgroundColor = "rgb("+randomColor.r+", "+randomColor.g+", "+randomColor.b+")"

            canvas.appendChild(corridorRectangle)
            
        })
    
    
    });


    var ocupiedTiles = []

    maze.rooms.forEach(element => {
        ocupiedTiles = ocupiedTiles.concat(element.tiles)
    });


    ocupiedTiles.forEach(corridorTile=>{

        var corridorRectangle = document.createElement("div")
        corridorRectangle.classList.add("room")

        corridorRectangle.style.height = tileSize+"px"
        corridorRectangle.style.width = tileSize+"px"
        corridorRectangle.style.top = corridorTile.y * tileSize+"px";
        corridorRectangle.style.left = corridorTile.x * tileSize+"px";
        corridorRectangle.style.opacity = 0.2
        corridorRectangle.style.backgroundColor = "red"

        canvas.appendChild(corridorRectangle)
        
    })



    

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