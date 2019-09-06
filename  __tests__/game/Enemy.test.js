const config = require('../../config.json');
const Enemy = require('./../../src/game/Enemy');
const enemy = new Enemy(config);

it('text suffer damage', () => {
    enemy.sufferDamage(10);
    expect(enemy.health).toBe(10);
    expect(enemy.status).toBe(1);
});

it('text dead', () => {
    enemy.sufferDamage(10);
    enemy.update();
    enemy.update();
    expect(enemy.sound).toBe('explosion');
    enemy.update();
    enemy.update();
    enemy.update();
    enemy.update();
    enemy.update();
    enemy.update();
    expect(enemy.sound).toBe(null);
    expect(enemy.health).toBe(0);
    expect(enemy.status).toBe(0);
});

