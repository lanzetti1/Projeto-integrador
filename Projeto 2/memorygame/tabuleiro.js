/*Tabuleiro do jogo da memória em javascript, utiliza o princípio de orientação a objetos.
para definir um objeto do tipo Tile (peça em inglês).
    Este jogo foi feito conforme instruções contidas na página:https://pt.khanacademy.org/computing/computer-programming/programming-games-visualizations/memory-game/a/grid-of-tiles. */

    var Tile = function(x, y, face) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.face = face;
        this.isFaceUp = false;
        this.isMatch = false;
    };
    
    Tile.prototype.draw = function() {
        fill(214, 247, 202);
        strokeWeight(2);
        rect(this.x, this.y, this.size, this.size, 10);
        if (this.isFaceUp) {
            image(this.face, this.x, this.y, this.size, this.size);
        } else {
            image(getImage("img/seed-of-life.png"), this.x, this.y, this.size, this.size);
        }
    };
    
    Tile.prototype.isUnderMouse = function(x, y) {
        return x >= this.x && x <= this.x + this.size  &&
            y >= this.y && y <= this.y + this.size;
    };
    
    // Configuração global.
    var NUM_COLS = 5;
    var NUM_ROWS = 4;
    
    // Declara um array de todas as faces possíveis.
    var faces = [
        getImage("img/3d.png"),
        getImage("img/abstract-shape.png"),
        getImage("img/cube.png"),
        getImage("img/cubeblk.png"),
        getImage("img/geometric.png"),
        getImage("img/hexagon.png"),
        getImage("img/memphis.png"),
        getImage("img/shape.png"),
        getImage("img/sphere.png"),
        getImage("img/star.png")
    ];
    
    // Faça uma array que tenha dois de cada, então randomize-o.
var possibleFaces = faces.slice(0);
var selected = [];
for (var i = 0; i < (NUM_COLS * NUM_ROWS) / 2; i++) {
    
    //Escolhe aleatoriamenteuma doaaray de faces restantes.
    var randomInd = floor(random(possibleFaces.length));
    var face = possibleFaces[randomInd];

    // Empurra duas vezes no array.
    selected.push(face);
    selected.push(face);

    // Remove do array.
    possibleFaces.splice(randomInd, 1);
}

// Agora precisamos randomizar o array
var shuffleArray = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var ind = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};
shuffleArray(selected);

// Criando o tabuleiro (ladrilhos)
var tiles = [];
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        var tileX = i * 54 + 10;
        var tileY = j * 54 + 40;
        var tileFace = selected.pop();
        tiles.push(new Tile(tileX, tileY, tileFace));
    }
}

background(255, 255, 255);

var numTries = 0;
var numMatches = 0;
var flippedTiles = [];
var delayStartFC = null;

mouseClicked = function() {
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        if (tile.isUnderMouse(mouseX, mouseY)) {
            if (flippedTiles.length < 2 && !tile.isFaceUp) {
                tile.isFaceUp = true;
                flippedTiles.push(tile);
                if (flippedTiles.length === 2) {
                    numTries++;
                    if (flippedTiles[0].face === flippedTiles[1].face) {
                        flippedTiles[0].isMatch = true;
                        flippedTiles[1].isMatch = true;
                        flippedTiles.length = 0;
                        numMatches++;
                    }
                    delayStartFC = frameCount;
                }
            } 
            loop();
        }
    }
};

draw = function() {
    background(255, 255, 255);
    if (delayStartFC && (frameCount - delayStartFC) > 30) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (!tile.isMatch) {
                tile.isFaceUp = false;
            }
        }
        flippedTiles = [];
        delayStartFC = null;
        noLoop();
    }
    
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw();
    }
    
    if (numMatches === tiles.length/2) {
        fill(0, 0, 0);
        textSize(20);
        text("Você encontrou todos eles em  " + numTries + " tentativas!", 20, 375);
    }
};

noLoop();