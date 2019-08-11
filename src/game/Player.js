const path = require('path');
const Element = require('./Element');
const Shot = require('./Shot');
const Sprite = require('../tools/Sprite');

class Player extends Element {
    constructor() {
        super();
        this.class = 'Player';
        this.socket = null;
        this.health = 100;
        this.score = 0;
        this.width = 50;
        this.height = 50;
        this.positionX = 400;
        this.positionY = 400;
        this.speed = 8;

        this.type = 'image';
        this.sprite = new Sprite(path.resolve(__dirname, '..', '..', 'public', 'img', 'player.png'), 3);
        this.image = this.sprite.getFrame(1);

        this.color = '#ff4e4e';

        this.shot = {};
        this.shot.lenght = 5;
        this.shot.speed = 8;
        this.shot.color = '#0000ff';
        this.damage = 10;

        this.time = null;
    }

    moveLeft() {
        this.positionX -= this.speed;
        if (this.positionX <= 0) {
            this.positionX = 0;
        }
        this.image = this.sprite.getFrame(3);
        setTimeout(() => {
            this.image = this.sprite.getFrame(1);
        }, 100);
    }

    moveRight() {
        this.positionX += this.speed;
        const CANVAS_WIDTH = parseInt(process.env.CANVAS_WIDTH);
        if (this.positionX >= CANVAS_WIDTH - this.width) {
            this.positionX = CANVAS_WIDTH - this.width;
        }
        this.image = this.sprite.getFrame(2);
        setTimeout(() => {
            this.image = this.sprite.getFrame(1);
        }, 100);
    }

    moveUp() {
        this.positionY -= this.speed;
        if (this.positionY <= 0) {
            this.positionY = 0;
        }
    }

    moveDown() {
        this.positionY += this.speed;
        const CANVAS_HEIGHT = parseInt(process.env.CANVAS_HEIGHT);
        if (this.positionY >= CANVAS_HEIGHT - this.height) {
            this.positionY = CANVAS_HEIGHT - this.height;
        }
    }

    fire(e) {
        const shot = new Shot({
            shooter: e,
            positionX: (this.positionX + this.width / 2),
            positionY: this.positionY,
            lenght: this.shot.lenght,
            speed: this.shot.speed,
            color: this.shot.color,
            direction: 'up'
        });
        return shot;
    }

    colision(element) {
        element.sufferDamage(this);
    }

    sufferDamage(element) {
        this.health -= element.damage;
    }

    addScore(score) {
        this.score += score;
    }
}

module.exports = Player;
