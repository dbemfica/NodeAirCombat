function routes({ io, Game }) {
    io.of('game').on('connection', (socket) => {
        socket.on('restart', () => {
            io.of('joystick').emit('restart', true);
        });
    })

    io.of('joystick').on('connection', (socket) => {

        // console.log('Player connected');

        if (Game.playersStatus.length === 0) {
            socket.player = Game.addPlayer(1, 'player.png');
        } else if (Game.playersStatus.length === 1) {
            socket.player = Game.addPlayer(2, 'player2.png');
        } else if (Game.playersStatus.length === 2) {
            socket.disconnect();
        }

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

        socket.on('restart', () => {
            Game.restart();
            io.of('game').emit('restart', true);
        });

        socket.on('disconnect', () => {
            // console.log('Player disconnected');
            Game.removePlayer(socket.player);
        });
    });
}

module.exports = routes;
