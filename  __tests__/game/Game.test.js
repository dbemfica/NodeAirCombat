const Game = require('./../../src/game/Game');
const game = new Game();

it('should start game', () => {
    game.start();
    expect(game.status).toBe(1);
});

it('should pause game', () => {
    game.pause();
    expect(game.status).toBe(0);
});