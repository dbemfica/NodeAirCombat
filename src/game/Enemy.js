const Element = require('./Element');
const Shot = require('./Shot');

class Enemy extends Element {
    constructor() {
        super();
        this.health = 20;
        this.width = 50;
        this.height = 50;
        this.positionX = 400;
        this.positionY = 100;
        this.speed = 8;
        this.type = 'rect';
        this.color = '#00ff00';

        this.shot = {};
        this.shot.lenght = 5;
        this.shot.speed = 8;
        this.shot.color = '#ff0000';
        this.damage = 10;
    }

    colision(element) {
        element.sufferDamage(this);
    }

    sufferDamage(element) {
        this.health -= element.damage;
    }
}

module.exports = Enemy;