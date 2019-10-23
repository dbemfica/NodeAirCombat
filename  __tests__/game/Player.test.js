const config = require('../../config.json');
const Player = require('./../../src/game/Player');
const player = new Player(config);

it('text move player to up', () => {
    player.moveUp();
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(370);
});

it('text move player to left', () => {
    player.moveLeft();
    expect(player.positionX).toBe(370);
    expect(player.positionY).toBe(370);
});

it('text move player to left + up', () => {
    player.moveLeftUp();
    expect(player.positionX).toBe(365);
    expect(player.positionY).toBe(365);
});

it('text move player to left + down', () => {
    player.moveLeftDown();
    expect(player.positionX).toBe(360);
    expect(player.positionY).toBe(370);
});

it('text move player to right', () => {
    player.moveRight();
    expect(player.positionX).toBe(365);
    expect(player.positionY).toBe(370);
});

it('text move player to right + up', () => {
    player.moveRightUp();
    expect(player.positionX).toBe(370);
    expect(player.positionY).toBe(365);
});

it('text move player to right + down', () => {
    player.moveRightDown();
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(370);
});

it('text move player to down', () => {
    player.moveDown();
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(375);
});

it('text forced move player to up', () => {
    player.positionY = 5;
    player.moveUp();
    player.moveUp();
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(0);
});

it('text forced move player to down', () => {
    player.positionY = 545;
    player.moveDown();
    player.moveDown();
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(550);
});

it('text suffer damage', () => {
    player.sufferDamage(10);
    expect(player.health).toBe(90);
    expect(player.status).toBe(1);
});

it('text dead', () => {
    player.sufferDamage(90);
    player.update();
    player.update();
    expect(player.sound).toBe('explosion');
    player.update();
    player.update();
    player.update();
    player.update();
    player.update();
    player.update();
    expect(player.sound).toBe(null);
    expect(player.health).toBe(0);
    expect(player.status).toBe(0);
});

it('text restart', () => {
    player.restart();
    expect(player.status).toBe(1);
    expect(player.health).toBe(100);
    expect(player.positionX).toBe(375);
    expect(player.positionY).toBe(375);
    expect(player.score).toBe(0);
});
