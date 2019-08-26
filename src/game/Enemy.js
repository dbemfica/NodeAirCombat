const path = require('path');
const Element = require('./Element');
const Shot = require('./Shot');
const Sprite = require('../tools/Sprite');

class Enemy extends Element {
    constructor(properties) {
        super();
        this.class = 'Enemy';
        this.health = 20;
        this.width = 50;
        this.height = 50;
        this.positionX = properties.positionX;
        this.positionY = -50;
        this.speed = 2;

        this.type = 'image';
        this.sprite = new Sprite(path.resolve(__dirname, '..', '..', 'public', 'img', 'enemy.png'), 10);
        this.image = this.sprite.getFrame(1);

        this.shot = {};
        this.shot.lenght = 4;
        this.shot.speed = 8;
        this.shot.color = '#8e0000';
        this.damage = 10;
        this.speedFire = 1;
    }

    update() {
        this.frame++;
        if (this.positionY < 140) {
            this.positionY += this.speed;
        }

    }

    colision(element) {
        element.sufferDamage(this);
    }

    sufferDamage(element) {
        this.onDead(element);
    }

    fire(e) {
        if (this.frame % 200 === 0) {
            const shot = new Shot({
                shooter: e,
                positionX: (this.positionX + this.width / 2),
                positionY: this.positionY + this.height,
                lenght: this.shot.lenght,
                speed: this.shot.speed,
                color: this.shot.color,
                direction: 'down'
            });
            return shot;
        }
        return null;
    }

    onDead(element) {
        let health = this.health - element.damage;
        if (health <= 0) {
            let i = 1;
            let time = setInterval(() => {
                this.image = this.sprite.getFrame(i+3);
                i++;
                if (i > 7) {
                    this.health -= element.damage;
                    clearInterval(time);
                }
            },30);
        } else {
            this.health -= element.damage;
        }
    }
}

module.exports = Enemy;
