const config = require('../../config.json');
const Player = require('./../../src/game/Player');
const player = new Player(config);

it('should move player to up', () => {
    player.moveUp();
    expect(player.positionX).toBe(400);
    expect(player.positionY).toBe(395);
});

it('should move player to left', () => {
    player.moveLeft();
    expect(player.positionX).toBe(395);
    expect(player.positionY).toBe(395);
});

it('should move player to left + up', () => {
    player.moveLeftUp();
    expect(player.positionX).toBe(390);
    expect(player.positionY).toBe(390);
});

it('should move player to left + down', () => {
    player.moveLeftDown();
    expect(player.positionX).toBe(385);
    expect(player.positionY).toBe(395);
});

it('should move player to right', () => {
    player.moveRight();
    expect(player.positionX).toBe(390);
    expect(player.positionY).toBe(395);
});

it('should move player to right + up', () => {
    player.moveRightUp();
    expect(player.positionX).toBe(395);
    expect(player.positionY).toBe(390);
});

it('should move player to right + down', () => {
    player.moveRightDown();
    expect(player.positionX).toBe(400);
    expect(player.positionY).toBe(395);
});

it('should move player to down', () => {
    player.moveDown();
    expect(player.positionX).toBe(400);
    expect(player.positionY).toBe(400);
});

it('should forced move player to up', () => {
    player.positionY = 5;
    player.moveUp();
    player.moveUp();
    expect(player.positionX).toBe(400);
    expect(player.positionY).toBe(0);
});

it('should forced move player to down', () => {
    player.positionY = 545;
    player.moveDown();
    player.moveDown();
    expect(player.positionX).toBe(400);
    expect(player.positionY).toBe(550);
});
