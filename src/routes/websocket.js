const Player = require('../game/Player');

function routes({ io, Game }) {
    io.of('joystick').on('connection', (socket) => {

        const player = new Player(Game.config);
        socket.player = Game.addPlayer(player);

        socket.on('start', () => {
            Game.start();
        });

        socket.on('moveUp', () => {
            socket.player.moveUp();
        });

        socket.on('moveDown', () => {
            socket.player.moveDown();
        });

        socket.on('moveLeft', () => {
            socket.player.moveLeft();
        });

        socket.on('moveRight', () => {
            socket.player.moveRight();
        });

        socket.on('moveLeftUp', () => {
            socket.player.moveLeftUp();
        });

        socket.on('moveRightUp', () => {
            socket.player.moveRightUp();
        });

        socket.on('moveLeftDown', () => {
            socket.player.moveLeftDown();
        });

        socket.on('moveRightDown', () => {
            socket.player.moveRightDown();
        });

        socket.on('moveStop', () => {
            socket.player.moveStop();
        });

        socket.on('fire', () => {
            const fire = socket.player.fire();
            Game.addElement(fire);
        });

        socket.on('disconnect', () => {
            Game.removePlayer(socket.player);
        });
    });
}

module.exports = routes;
