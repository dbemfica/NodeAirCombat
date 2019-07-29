const Player = require('../game/Player');

function routes({ io, Game }) {
    io.of('joystick').on('connection', (socket) => {
        
        let player = new Player;
        socket.index = Game.addElement(player);

        socket.on('move_left', (message) => {
            Game.elements[socket.index].moveLeft();
        })
        socket.on('move_right', (message) => {
            Game.elements[socket.index].moveRight();
        })

        socket.on('move_up', (message) => {
            Game.elements[socket.index].moveUp();
        })

        socket.on('move_down', (message) => {
            Game.elements[socket.index].moveDown();
        })

        socket.on('fire', (message) => {
            const fire = Game.elements[socket.index].fire();
            Game.addElement(fire);
        })
    });
}

module.exports = routes;