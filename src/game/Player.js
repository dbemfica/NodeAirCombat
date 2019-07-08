class Player {
    constructor() {
        this.speed = 10;
        this.positionX = 0;
        this.positionY = 0;
    }

    moveLeft() {
        this.positionX -= this.speed;
    }

    moveRight() {
        this.positionX += this.speed;
    }

    moveUp() {
        this.positionY += this.speed;
    }

    moveDown() {
        this.positionY -= this.speed;
    }
}

module.exports = new Player();