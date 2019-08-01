const Element = require('./Element');

class Shot extends Element {
    constructor(properties) {
        super();
        this.class = 'Shot';
        this.shooter = properties.shooter;
        this.health = 1;
        this.positionX = properties.positionX;
        this.positionY = properties.positionY;
        this.width = 5;
        this.height = 5;
        this.lenght = properties.lenght;
        this.speed = properties.speed;
        this.type = 'circle';
        this.color = properties.color;
        this.direction = properties.direction;
        this.damage = 10;
    }

    update() {
        if (this.direction === 'up') {
            this.positionY -= this.speed;
        }
        if (this.direction === 'down') {
            this.positionY += this.speed;
        }
    }

    colision(element) {
        this.health = 0;
        element.sufferDamage(this);
    }
}

module.exports = Shot;
