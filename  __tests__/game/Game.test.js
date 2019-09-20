const config = require('../../config.json');
const Game = require('./../../src/game/Game');
const Enemy = require('./../../src/game/Enemy');
const Player = require('./../../src/game/Player');
const game = new Game(config);

it('test start', () => {
    game.start();
    expect(game.status).toBe(1);
});

it('test add element', () => {
    const enemy = new Enemy(config);
    const enemy2 = new Enemy(config);
    game.addElement(enemy);
    game.addElement(enemy2);
    expect(game.elements.length).toBe(2);
});

it('test remove element', () => {
    game.removeElement(1);
    game.removeElement(0);
    expect(game.elements.length).toBe(0);
});

it('Test colision', () => {
    const player = new Player(config);
    player.positionX = 100;
    player.positionY = 100;
    game.addElement(player);

    const enemy = new Enemy(config);
    enemy.positionX = 100;
    enemy.positionY = 100;
    game.addElement(enemy);
    game.colision();

    expect(game.elements[0].health).toBe(90);
    expect(game.elements[1].health).toBe(10);
    game.removeElement(1);
    game.removeElement(0);
});

it('Test remove element after colision', () => {
    const player = new Player(config);
    player.positionX = 100;
    player.positionY = 100;
    game.addElement(player);

    const enemy = new Enemy(config);
    enemy.positionX = 100;
    enemy.positionY = 100;
    game.addElement(enemy);

    expect(game.elements.length).toBe(2);

    game.update();
    game.update();

    expect(game.elements[0].health).toBe(80);
    expect(game.elements[1].status).toBe(2);

    game.update();
    game.update();
    game.update();
    game.update();
    game.update();
    game.update();
    game.update();
    game.update();

    expect(game.elements.length).toBe(1);
});
