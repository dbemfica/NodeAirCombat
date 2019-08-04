const Player = require('../game/Player');

function routes({ io, Game }) {
    io.of('joystick').on('connection', (socket) => {

        const player = new Player;
        player.socket = socket.id;
        Game.addElement(player);

        socket.on('move_left', () => {
            const element = Game.findPlayer(socket.id);
            element.moveLeft();
        });

        socket.on('move_right', () => {
            const element = Game.findPlayer(socket.id);
            element.moveRight();
        });

        socket.on('move_up', () => {
            const element = Game.findPlayer(socket.id);
            element.moveUp();
        });

        socket.on('move_down', () => {
            const element = Game.findPlayer(socket.id);
            element.moveDown();
        });

        socket.on('fire', () => {
            const element = Game.findPlayer(socket.id);
            const fire = element.fire(element);
            Game.addElement(fire);
        });

        socket.on('disconnect', () => {
            const element = Game.findPlayer(socket.id);
            Game.removeElement(element);
        });
    });
}

module.exports = routes;
