//var ocupiedTiles = []



function createMaze(size){
    console.log("creating maze")
    var maze = getRooms(size)

    locateRooms(maze)


    var ocupiedTiles = []

    maze.forEach(room => {
        if(room.tiles)
            ocupiedTiles = ocupiedTiles.concat(room.tiles)
    });



    var marginTiles = ocupiedTiles.filter(tile=>{
        return tile.tileType == 1

    })


    //normalize locations
    normalizePositions(maze)
    
    var corridors = getCorridors(maze)



    return {rooms:maze, corridors: corridors, ocupiedTiles:ocupiedTiles};

}


function getCorridors(rooms){
    
}

function normalizePositions(rooms){
    var minTilePosX = 0;
    var minTilePosY = 0;

    rooms.forEach(element => {
        
        var minRoomTilePosX = element.position.x - Math.floor(element.size.w/2);
        var minRoomTilePosY = element.position.y - Math.floor(element.size.h/2);
        
        minTilePosX = Math.min(minTilePosX,minRoomTilePosX)
        minTilePosY = Math.min(minTilePosY,minRoomTilePosY)
    });


    rooms.forEach(element => {
        element.position.x += Math.abs(minTilePosX)
        element.position.y += Math.abs(minTilePosY)

        element.tiles.forEach(tile=>{
            tile.x += Math.abs(minTilePosX)
            tile.y += Math.abs(minTilePosY)
        })


    });


/*    ocupiedTiles.forEach(tile=>{
        tile.x += Math.abs(minTilePosX)
        tile.y += Math.abs(minTilePosY)
    })*/



}


function getRooms(size){
    var rooms = [];
    for(var i = 0; i < size; i++){
        rooms.push(
            {
                size: getRandomRoom(),
                position:null
            }
        )
    }

    return rooms;
}

function getRandomRoom(){

    var rooms = [
        {w:3,h:3},
        {w:3,h:5},
        {w:5,h:3},
        {w:5,h:5},
        {w:3,h:9},
        {w:9,h:3},
        {w:5,h:9},
        {w:9,h:5},
        {w:9,h:9}
    ]

    return  rooms[(Math.floor(Math.random()*rooms.length))]
}

function locateRooms(rooms){

    rooms.forEach((element,i) => {
        
        var located = rooms.filter(function (room){
            return room.position != null
        })

        console.log("--------------------------------------------------------------------")
        console.log("--------------------------------------------------------------------")
        console.log("--------------------------------------------------------------------")
        console.log("locateSingleRoom room "+i)



        var ocupiedTiles = []

        rooms.forEach(room => {
            if(room.tiles)
                ocupiedTiles = ocupiedTiles.concat(room.tiles)
        });

        locateSingleRoom(element, ocupiedTiles)

    });

}

function locateSingleRoom(room, ocupiedTiles){

    if(ocupiedTiles.length == 0){
        room.position = {x:0,y:0}

        room.tiles = getCollitionTiles(room.size,room.position,1)
        ocupiedTiles = ocupiedTiles.concat(room.tiles)
 

    }else{

        var marginTiles = ocupiedTiles.filter((tile)=>{
            return tile.tileType == 1
        })


        
        while(room.position == null){
            console.log(marginTiles.length)
            var randomTile = marginTiles[Math.floor(Math.random()*marginTiles.length)]
            console.log("random Tile")
            console.log(randomTile)
            marginTiles.splice(marginTiles.indexOf(randomTile),1)
            

            var candidateDirections = getUnocupiedDirectionsForTile(randomTile, ocupiedTiles)
            //TODO: sort random candidates

            candidateDirections.forEach(direction => {
                

                var sugestedRoomPosition = getPositionForRommAtDirectionIfNotCollide(room,direction, ocupiedTiles)
                console.log("sugested position = "+sugestedRoomPosition)
                if(sugestedRoomPosition != null){
                    console.log("positioned on x"+sugestedRoomPosition.x+" y"+sugestedRoomPosition.y)
                    room.position = sugestedRoomPosition
                    room.tiles = getCollitionTiles(room.size,room.position,1)

                }


            });

        }


        console.log(ocupiedTiles)
         
    }
}

function getPositionForRommAtDirectionIfNotCollide(room, direction, ocupiedTiles){
    var xDisplacement = Math.floor(room.size.w/2)
    var yDisplacement = Math.floor(room.size.h/2)

    var position = null

    switch(direction.direction){
        case "Top":
            position = { x: direction.x , y: direction.y - yDisplacement}
            break
        case "TopRight":
            position = { x: direction.x + xDisplacement , y: direction.y - yDisplacement}
            break
        case "Right":
            position = { x: direction.x + xDisplacement, y: direction.y}
            break
        case "BottomRight":
            position = { x: direction.x + xDisplacement, y: direction.y + yDisplacement}
            break
        case "Bottom":
            position = { x: direction.x , y: direction.y + yDisplacement}
            break
        case "BottomLeft":
            position = { x: direction.x - xDisplacement, y: direction.y + yDisplacement}
            break
        case "Left":
            position = { x: direction.x - xDisplacement, y: direction.y}
            break
        case "TopLeft":
            position = { x: direction.x - xDisplacement, y: direction.y - yDisplacement}
            break
    }

    console.log("trying with position x"+position.x+" y"+position.y )
    var collitionTilesAtPosition =  getCollitionTiles(room.size,position,0)

    var allTilesPassClean = collitionTilesAtPosition.filter(function(collitionTile){
        return ocupiedTiles.filter(function(ocupiedTIle){
            return ocupiedTIle.x == collitionTile.x && ocupiedTIle.y == collitionTile.y
        }).length == 0
    }).length == collitionTilesAtPosition.length

    console.log(allTilesPassClean)

    if(allTilesPassClean)
        return position
    else
        return null




}


function willCollideRoom( room , position,  locatedRooms){

    room.position = position

    var roomTileMatrix = getCollitionTiles(room.size,position,1)

    return false

}

function getCollitionTiles(roomsize, position, margin){
    var tileMatrix = []
    var leftTile = - (Math.floor(roomsize.w/2) + margin)+position.x
    var topTile = - (Math.floor(roomsize.h/2) + margin)+position.y



    for(var row = 0; row < roomsize.h+margin*2; row++){
        for(var col = 0; col < roomsize.w+margin*2; col++){

            var tileType = row < margin || col < margin || row > roomsize.h || col > roomsize.w ? 1 : 0

            tileMatrix.push(
                {
                    x: leftTile + col,
                    y: topTile + row,
                    tileType : tileType                    
                }
            )

        }    
    }
    
    return tileMatrix

}


function getUnocupiedDirectionsForTile(tile, ocupiedTiles){
    
    //posibles direcciones
    var adjacentTiles = [
        {x:tile.x,      y:tile.y-1, direction:"Top"},
        {x:tile.x+1,    y:tile.y-1, direction:"TopRight"},
        {x:tile.x+1,    y:tile.y,   direction:"Right"},
        {x:tile.x+1,    y:tile.y+1, direction:"BottomRight"},
        {x:tile.x,      y:tile.y+1, direction:"Bottom"},
        {x:tile.x-1,    y:tile.y+1, direction:"BottomLeft"},
        {x:tile.x-1,    y:tile.y,   direction:"Left"},
        {x:tile.x-1,    y:tile.y-1, direction:"TopLeft"},
    ] 

    //filtra la lista de adyacentes
    var candidates = adjacentTiles.filter(tile=>{
        //agrega la dirección si el tamaño de lista de ocupadas con la misma posicion es cero
        return ocupiedTiles.filter(function(octile){ return octile.x == tile.x && octile.y == tile.y}).length == 0
    })
    

    return candidates


}

