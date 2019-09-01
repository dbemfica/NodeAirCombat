const config = require('../../config.json');
const Game = require('./../../src/game/Game');
const game = new Game(config);

it('should start game', () => {
    game.start();
    expect(game.status).toBe(1);
});

it('should pause game', () => {
    game.pause();
    expect(game.status).toBe(0);
});
