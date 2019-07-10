class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.width = 50;
        this.height = 50;
        this.speed = 8;
        this.type = 'rect';
        this.color = '#ff4e4e';
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
}

module.exports = new Player();