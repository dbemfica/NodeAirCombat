function routes({ io, Game }) {
    io.on('connection', (socket) => {
        socket.on('move_left', (message) => {
            Game.players[0].moveLeft();
            console.log(Game);
        })
        socket.on('move_right', (message) => {
            Game.players[0].moveRight();
            console.log(Game);
        })
    });
}

module.exports = routes;