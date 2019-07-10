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
    });
}

module.exports = routes;