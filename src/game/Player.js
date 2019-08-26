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
        this.speed = 5;

        this.type = 'image';
        this.sprite = new Sprite(path.resolve(__dirname, '..', '..', 'public', 'img', 'player.png'), 10);
        this.image = this.sprite.getFrame(1);

        this.shot = {};
        this.shot.lenght = 4;
        this.shot.speed = 8;
        this.shot.color = '#00006f';
        this.damage = 10;
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

    moveLeft() {
        this.image = this.sprite.getFrame(3);
        this.positionX -= this.speed;
        if (this.positionX <= 0) {
            this.positionX = 0;
        }

    }

    moveRight() {
        this.image = this.sprite.getFrame(2);
        this.positionX += this.speed;
        const CANVAS_WIDTH = parseInt(process.env.CANVAS_WIDTH);
        if (this.positionX >= CANVAS_WIDTH - this.width) {
            this.positionX = CANVAS_WIDTH - this.width;
        }
    }

    moveLeftUp() {
        this.image = this.sprite.getFrame(3);
        this.positionX -= this.speed;
        if (this.positionX <= 0) {
            this.positionX = 0;
        }
        this.positionY -= this.speed;
        if (this.positionY <= 0) {
            this.positionY = 0;
        }
    }

    moveRightUp() {
        this.image = this.sprite.getFrame(2);
        this.positionX += this.speed;
        const CANVAS_WIDTH = parseInt(process.env.CANVAS_WIDTH);
        if (this.positionX >= CANVAS_WIDTH - this.width) {
            this.positionX = CANVAS_WIDTH - this.width;
        }
        this.positionY -= this.speed;
        if (this.positionY <= 0) {
            this.positionY = 0;
        }
    }

    moveLeftDown() {
        this.image = this.sprite.getFrame(3);
        this.positionX -= this.speed;
        if (this.positionX <= 0) {
            this.positionX = 0;
        }
        this.image = this.sprite.getFrame(3);
        this.positionY += this.speed;
        if (this.positionY <= 0) {
            this.positionY = 0;
        }
    }

    moveRightDown() {
        this.image = this.sprite.getFrame(2);
        this.positionX += this.speed;
        const CANVAS_WIDTH = parseInt(process.env.CANVAS_WIDTH);
        if (this.positionX >= CANVAS_WIDTH - this.width) {
            this.positionX = CANVAS_WIDTH - this.width;
        }
        this.positionY += this.speed;
        const CANVAS_HEIGHT = parseInt(process.env.CANVAS_HEIGHT);
        if (this.positionY >= CANVAS_HEIGHT - this.height) {
            this.positionY = CANVAS_HEIGHT - this.height;
        }
    }

    moveStop() {
        this.image = this.sprite.getFrame(1);
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
        this.onDead(element);
    }

    addScore(score) {
        this.score += score;
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

module.exports = Player;
