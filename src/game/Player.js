const Shot = require('./Shot');

class Player {
    constructor() {
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
    }

    moveLeft() {
        this.positionX -= this.speed;
    }

    moveRight() {
        this.positionX += this.speed;
    }

    moveUp() {
        this.positionY -= this.speed;
    }

    moveDown() {
        this.positionY += this.speed;
    }

    fire() {
        const shot = new Shot({
            x: (this.positionX + this.width / 2),
            y: this.positionY,
            l: this.shot.lenght,
            s: this.shot.speed,
            c: this.shot.color,
            d: 'up'
        });
        return shot;
    }
}

module.exports = new Player();