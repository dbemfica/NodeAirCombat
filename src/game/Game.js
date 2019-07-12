const player = require('./Player');

class Game {
    constructor(io){
        this.elements = [];
        this.elements[0] = player;
        this.elements[1] = {};
        this.elements[1].positionX = 400;
        this.elements[1].positionY = 400;
        this.elements[1].width = 50;
        this.elements[1].height = 50;
        this.elements[1].speed = 8;
        this.elements[1].type = 'rect';
        this.elements[1].color = '#00ff00';
    }
}

module.exports = new Game();