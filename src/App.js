const express = require('express');
const path = require('path');
const server = require('http');
const io = require('socket.io');
const Game = require('./game/Game');

class App {
    constructor(config) {
        this.config = config;
        this.game = new Game(this.config);
        this.express = express();
        this.server = server;
        this.server = server.Server(this.express);
        this.io = io(this.server);
        this.routes();
        this.templates();

        this.start();
    }

    routes() {
        this.express.use(require('./routes/http'));
        require('./routes/websocket')({io: this.io, Game: this.game});
    }

    templates() {
        this.express.set('views', path.resolve(__dirname, '..', 'templates'));
        this.express.set('view engine', 'ejs');
        this.express.use(express.static(path.resolve(__dirname, '..', 'public')));
    }

    start() {
        setInterval(() => {
            if (this.game.status === 1) {
                this.game.update();
                this.io.of('/game').emit('game', this.game);
            }
        }, this.config.fameRate);
    }
}

module.exports = App;
