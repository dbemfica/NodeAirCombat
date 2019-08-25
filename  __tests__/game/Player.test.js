const Player = require('./../../src/game/Player');

it('should move player to up', () => {
    const player = new Player();
    player.moveUp();
    expect(player.positionY).toBe(395);
});

it('should move player to left', () => {
    const player = new Player();
    player.moveLeft();
    expect(player.positionX).toBe(395);
});

it('should move player to left + up', () => {
    const player = new Player();
    player.moveLeftUp();
    expect(player.positionX).toBe(395);
    expect(player.positionY).toBe(395);
});

it('should move player to left + down', () => {
    const player = new Player();
    player.moveLeftDown();
    expect(player.positionX).toBe(395);
    expect(player.positionY).toBe(405);
});

it('should move player to right', () => {
    const player = new Player();
    player.moveRight();
    expect(player.positionX).toBe(405);
});

it('should move player to right + up', () => {
    const player = new Player();
    player.moveRightUp();
    expect(player.positionX).toBe(405);
    expect(player.positionY).toBe(395);
});

it('should move player to right + down', () => {
    const player = new Player();
    player.moveRightDown();
    expect(player.positionX).toBe(405);
    expect(player.positionY).toBe(405);
});

it('should move player to down', () => {
    const player = new Player();
    player.moveDown();
    expect(player.positionY).toBe(405);
});
