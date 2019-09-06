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
        this.sound = properties.sound;
    }

    update() {
        this.frame++;
        if (this.direction === 'up') {
            this.positionY -= this.speed;
        }

        if (this.direction === 'down') {
            this.positionY += this.speed;
        }

        if (this.positionX > 650 || this.positionX < -50) {
            this.status = 0;
        }

        if (this.positionY > 650 || this.positionY < -50) {
            this.status = 0;
        }

        if (this.frame > 1) {
            this.sound = null;
        }
    }

    sufferDamage(damage) {
        this.health = this.health - damage;
        if (this.health <= 0) {
            this.status = 0;
        }
    }
}

module.exports = Shot;
