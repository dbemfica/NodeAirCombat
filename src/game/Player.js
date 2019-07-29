const Element = require('./Element');
const Shot = require('./Shot');

class Player extends Element {
    constructor() {
        super();
        this.socket = null;
        this.health = 100;
        this.width = 50;
        this.height = 50;
        this.positionX = 400;
        this.positionY = 400;
        this.speed = 8;
        this.type = 'rect';
        this.color = '#ff4e4e';

        this.shot = {};
        this.shot.lenght = 5;
        this.shot.speed = 8;
        this.shot.color = '#0000ff';
        this.damage = 10;
    }

    moveLeft() {
        this.positionX -= this.speed;
        if (this.positionX <= 0) {
            this.positionX = 0;
        }
    }

    moveRight() {
        this.positionX += this.speed;
        const CANVAS_WIDTH = parseInt(process.env.CANVAS_WIDTH);
        if (this.positionX >= CANVAS_WIDTH - this.width) {
            this.positionX = CANVAS_WIDTH - this.width;
        }
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

    fire() {
        const shot = new Shot({
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
}

module.exports = Player;