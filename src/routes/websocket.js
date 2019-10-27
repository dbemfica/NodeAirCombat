function routes({ io, Game }) {
    io.of('game').on('connection', (socket) => {
        socket.on('restart', () => {
            io.of('joystick').emit('restart', true);
        });
    })

    io.of('joystick').on('connection', (socket) => {

        if (Game.connectedPlayers.length === 0) {
            socket.indexPlayer = Game.addPlayer(1, 'player.png');
        } else if (Game.connectedPlayers.length === 1) {
            socket.indexPlayer = Game.addPlayer(2, 'player2.png');
        }

        if (Game.status === 2) {
            io.of('joystick').emit('restart', true);
        }

        socket.on('start', () => {
            Game.start();
        });

        socket.on('moveUp', () => {
            Game.connectedPlayers[socket.indexPlayer].moveUp();
        });

        socket.on('moveDown', () => {
            Game.connectedPlayers[socket.indexPlayer].moveDown();
        });

        socket.on('moveLeft', () => {
            Game.connectedPlayers[socket.indexPlayer].moveLeft();
        });

        socket.on('moveRight', () => {
            Game.connectedPlayers[socket.indexPlayer].moveRight();
        });

        socket.on('moveLeftUp', () => {
            Game.connectedPlayers[socket.indexPlayer].moveLeftUp();
        });

        socket.on('moveRightUp', () => {
            Game.connectedPlayers[socket.indexPlayer].moveRightUp();
        });

        socket.on('moveLeftDown', () => {
            Game.connectedPlayers[socket.indexPlayer].moveLeftDown();
        });

        socket.on('moveRightDown', () => {
            Game.connectedPlayers[socket.indexPlayer].moveRightDown();
        });

        socket.on('moveStop', () => {
            Game.connectedPlayers[socket.indexPlayer].moveStop();
        });

        socket.on('fire', () => {
            const fire = Game.connectedPlayers[socket.indexPlayer].fire();
            if (fire !== undefined) {
                Game.addElement(fire);
            }
        });

        socket.on('restart', () => {
            Game.restart();
            io.of('game').emit('restart', true);
        });

        socket.on('disconnect', () => {
            Game.disconnectPlayer(socket.indexPlayer);
        });
    });
}

module.exports = routes;
