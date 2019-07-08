const player = require('./Player');

class Game {
    constructor(io){
        this.players = [];
        this.players[0] = player;
    }
}

module.exports = new Game();