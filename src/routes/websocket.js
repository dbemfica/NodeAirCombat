const Player = require('../game/Player');

function routes({ io, Game }) {
    io.of('joystick').on('connection', (socket) => {

        let player = new Player;
        socket.index = Game.addElement(player);
        console.log(socket.index);

        socket.on('move_left', () => {
            console.log(socket.index);
            Game.elements[socket.index].moveLeft();
        })
        socket.on('move_right', () => {
            console.log(socket.index);
            Game.elements[socket.index].moveRight();
        })

        socket.on('move_up', () => {
            console.log(socket.index);
            Game.elements[socket.index].moveUp();
        })

        socket.on('move_down', () => {
            console.log(socket.index);
            Game.elements[socket.index].moveDown();
        })

        socket.on('fire', () => {
            const fire = Game.elements[socket.index].fire(socket.index);
            Game.addElement(fire);
        })

        socket.on('disconnect', () => {
            Game.removeElement(socket.index);
          });
    });
}

module.exports = routes;
