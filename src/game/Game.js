const player = require('./Player');

class Game {
    constructor(io){
        this.elements = [];
        this.elements[0] = player;
    }
}

module.exports = new Game();