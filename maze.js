var ocupiedTiles = []


function createMaze(size){
    print("creating maze")
    var maze = getRooms(size)

    locateRooms(maze)


    //normalize locations
    normalizePositions(maze)
    
    
    return maze;

}

function normalizePositions(rooms){
    var minTilePosX = 0;
    var minTilePosY = 0;

    rooms.forEach(element => {
        
        var minRoomTilePosX = element.position.x - element.size.w/2;
        var minRoomTilePosY = element.position.y - element.size.h/2;
        
        minTilePosX = Math.min(minTilePosX,minRoomTilePosX)
        minTilePosY = Math.min(minTilePosY,minRoomTilePosY)


    });
    console.log("minTilePosX "+minTilePosX +" minTilePosY"+minTilePosY)

    rooms.forEach(element => {
        element.position.x += Math.abs(minTilePosX)
        element.position.y += Math.abs(minTilePosY)
    });

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
        {w:4,h:4},
        {w:4,h:6},
        {w:6,h:4},
        {w:6,h:6},
        {w:4,h:8},
        {w:8,h:4},
        {w:6,h:8},
        {w:8,h:6},
        {w:8,h:8}
    ]

    return  rooms[(Math.floor(Math.random()*rooms.length))]
}

function locateRooms(rooms){

    rooms.forEach(element => {
        
        var located = rooms.filter(function (room){
            return room.position != null
        })

        locateSingleRoom(element)

    });

}

function locateSingleRoom(room){
    room.position = {x:0,y:0}

    if(ocupiedTiles.length == 0){

        var newTiles = getCollitionTiles(room.size,room.position,1)
        ocupiedTiles = ocupiedTiles.concat(newTiles)
        print(ocupiedTiles.length)

    }else{

        var marginTiles = ocupiedTiles.filter((tile)=>{
            return tile.tileType == 1
        })

        print(marginTiles.length)

        var randomTile = marginTiles[Math.floor(Math.random()*marginTiles.length)]

        print(randomTile)
        var candidateTiles = getUnocupiedDirectionsForTile(randomTile)

        print(ocupiedTiles)
        print(candidateTiles)
        debugger
        /*
        var lastPosition = locatedRooms[locatedRooms.length-1].position;
        var lastRoom = locatedRooms[locatedRooms.length-1];
        var sugestedPosition = {x:0,y:0}


        var xDisplacement = Math.floor(lastRoom.size.w / 2)+ Math.floor(room.size.w / 2) + 1
        var yDisplacement = Math.floor(lastRoom.size.h / 2)+ Math.floor(room.size.h / 2) + 1

        var direction = Math.floor(Math.random()*4)

        //random direction
        switch (direction){
            case 0://top
                sugestedPosition = {
                    x: lastPosition.x,
                    y: lastPosition.y + yDisplacement
                }
            break;
            case 1://right
                sugestedPosition = {
                    x: lastPosition.x + xDisplacement,
                    y: lastPosition.y
                }
            break;
            case 2://bottom
                sugestedPosition = {
                    x: lastPosition.x,
                    y: lastPosition.y - yDisplacement
                }
            break;
            case 3://left
                sugestedPosition = {
                    x: lastPosition.x - xDisplacement,
                    y: lastPosition.y
                }
            break;
        }
        



        while(willCollideRoom(room, sugestedPosition, locatedRooms)){
            

        }*/
    }
}


function willCollideRoom( room , position,  locatedRooms){

    room.position = position

    var roomTileMatrix = getCollitionTiles(room.size,position,1)



    return false

}

function getCollitionTiles(roomsize, position, margin){
    var tileMatrix = []
    for(var row = - margin; row < roomsize.h+margin; row++){
        for(var col = - margin; col < roomsize.w+margin; col++){


            var tileType = row < 0 || row > roomsize.w-1 || col < 0 || col > roomsize.h-1 ? 1 : 0

            tileMatrix.push(
                {
                    x: (position.x - (roomsize.w / 2)) + col,
                    y: (position.y - (roomsize.h / 2)) + row,
                    tileType : tileType                    
                }
            )

        }    
    }
    
    return tileMatrix

}


function getUnocupiedDirectionsForTile(tile){
    
    //posibles direcciones
    var adjacentTiles = [
        {x:tile.x,y:tile.y-1,direction:"Top"},
        {x:tile.x+1,y:tile.y-1, direction:"TopRight"},
        {x:tile.x+1,y:tile.y, direction:"Right"},
        {x:tile.x+1,y:tile.y+1, direction:"BottomRight"},
        {x:tile.x,y:tile.y+1, direction:"Bottom"},
        {x:tile.x-1,y:tile.y+1, direction:"BottomLeft"},
        {x:tile.x-1,y:tile.y, direction:"Left"},
        {x:tile.x-1,y:tile.y-1, direction:"TopLeft"},
    ] 

    //filtra la lista de adyacentes
    var candidates = adjacentTiles.filter(tile=>{
        //agrega la dirección si el tamaño de lista de ocupadas con la misma posicion es cero
        return ocupiedTiles.filter(function(octile){ return octile.x == tile.x && octile.y == tile.y}).length == 0
    })
    

    return candidates


}


function print(value){
    console.log(value)
}
