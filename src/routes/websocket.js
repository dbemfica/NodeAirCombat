const Player = require('../game/Player');

function routes({ io, Game }) {
    io.of('joystick').on('connection', (socket) => {

        const player = new Player;
        player.socket = socket.id;
        Game.addElement(player);

        socket.on('moveUp', () => {
            const element = Game.findPlayer(socket.id);
            element.moveUp();
        });

        socket.on('moveDown', () => {
            const element = Game.findPlayer(socket.id);
            element.moveDown();
        });

        socket.on('moveLeft', () => {
            const element = Game.findPlayer(socket.id);
            element.moveLeft();
        });

        socket.on('moveRight', () => {
            const element = Game.findPlayer(socket.id);
            element.moveRight();
        });

        socket.on('moveLeftUp', () => {
            const element = Game.findPlayer(socket.id);
            element.moveLeftUp();
        });

        socket.on('moveRightUp', () => {
            const element = Game.findPlayer(socket.id);
            element.moveRightUp();
        });

        socket.on('moveLeftDown', () => {
            const element = Game.findPlayer(socket.id);
            element.moveLeftDown();
        });

        socket.on('moveRightDown', () => {
            const element = Game.findPlayer(socket.id);
            element.moveRightDown();
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
