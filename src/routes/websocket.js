function routes({ io, Game }) {
    io.on('connection', (socket) => {
        socket.on('move_left', (message) => {
            Game.elements[0].moveLeft();
        })
        socket.on('move_right', (message) => {
            Game.elements[0].moveRight();
        })

        socket.on('move_up', (message) => {
            Game.elements[0].moveUp();
        })

        socket.on('move_down', (message) => {
            Game.elements[0].moveDown();
        })

        socket.on('fire', (message) => {
            console.log(message)
            const fire = Game.elements[0].fire();
            Game.addElement(fire);
        })
    });
}

module.exports = routes;