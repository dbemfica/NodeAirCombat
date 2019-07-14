class Shot {
    constructor(properties) {
        this.positionX = properties.x;
        this.positionY = properties.y;
        this.lenght = properties.l;
        this.speed = properties.s;
        this.type = 'circle';
        this.color = properties.c;

        setInterval(() => {
            this.move(properties.d)
        }, process.env.FRAME_RATE)
    }

    move(direction) {
        if (direction === 'up') {
            this.positionY -= this.speed;
        }
    }
}

module.exports = Shot;