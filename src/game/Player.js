const path = require('path');
const Element = require('./Element');
const Shot = require('./Shot');
const Sprite = require('../tools/Sprite');

class Player extends Element {
    constructor(config, playerNumber = 1, avatar = 'player.png') {
        super();
        this.config = config;
        this.class = 'Player';
        this.playerNumber = playerNumber;
        this.health = 100;
        this.width = 50;
        this.height = 50;
        this.positionX = 375;
        this.positionY = 375;
        this.speed = 5;
        this.score = 0;

        this.type = 'image';
        this.sprite = new Sprite(path.resolve(__dirname, '..', '..', 'public', 'img', avatar), 10);
        this.image = this.sprite.getFrame(1);

        this.shot = {};
        this.shot.lenght = 4;
        this.shot.speed = 8;
        this.shot.color = '#00006f';
        this.damage = 10;
    }

    update() {
        this.frame++;
        if (this.status === 2) {
            this.dying();
        }
    }

    sufferDamage(damage) {
        let health = this.health - damage;
        if (health <= 0) {
            this.status = 2;
        } else {
            this.health = health;
        }
    }

    moveUp() {
        if (this.status === 1) {
            this.positionY -= this.speed;
            if (this.positionY <= 0) {
                this.positionY = 0;
            }
        }
    }

    moveDown() {
        if (this.status === 1) {
            this.positionY += this.speed;
            let canvasHeight = this.config.canvasHeight;
            if (this.positionY >= canvasHeight - this.height) {
                this.positionY = canvasHeight - this.height;
            }
        }
    }

    moveLeft() {
        if (this.status === 1) {
            this.image = this.sprite.getFrame(3);
            this.positionX -= this.speed;
            if (this.positionX <= 0) {
                this.positionX = 0;
            }
        }
    }

    moveRight() {
        if (this.status === 1) {
            this.image = this.sprite.getFrame(2);
            this.positionX += this.speed;
            let canvasWidth = this.config.canvasWidth;
            if (this.positionX >= canvasWidth - this.width) {
                this.positionX = canvasWidth - this.width;
            }
        }
    }

    moveLeftUp() {
        if (this.status === 1) {
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
    }

    moveRightUp() {
        if (this.status === 1) {
            this.image = this.sprite.getFrame(2);
            this.positionX += this.speed;
            let canvasWidth = this.config.canvasWidth;
            if (this.positionX >= canvasWidth - this.width) {
                this.positionX = canvasWidth - this.width;
            }
            this.positionY -= this.speed;
            if (this.positionY <= 0) {
                this.positionY = 0;
            }
        }
    }

    moveLeftDown() {
        if (this.status === 1) {
            this.image = this.sprite.getFrame(3);
            this.positionX -= this.speed;
            if (this.positionX <= 0) {
                this.positionX = 0;
            }
            this.image = this.sprite.getFrame(3);
            this.positionY += this.speed;
            let canvasHeight = this.config.canvasHeight;
            if (this.positionY >= canvasHeight - this.height) {
                this.positionY = canvasHeight - this.height;
            }
        }
    }

    moveRightDown() {
        if (this.status === 1) {
            this.image = this.sprite.getFrame(2);
            this.positionX += this.speed;
            let canvasWidth = this.config.canvasWidth;
            if (this.positionX >= canvasWidth - this.width) {
                this.positionX = canvasWidth - this.width;
            }
            this.positionY += this.speed;
            let canvasHeight = this.config.canvasHeight;
            if (this.positionY >= canvasHeight - this.height) {
                this.positionY = canvasHeight - this.height;
            }
        }
    }

    moveStop() {
        this.image = this.sprite.getFrame(1);
    }

    fire() {
        if (this.status === 1) {
            const shooter = this;
            const shot = new Shot({
                shooter: shooter,
                positionX: (this.positionX + this.width / 2),
                positionY: this.positionY,
                lenght: this.shot.lenght,
                speed: this.shot.speed,
                color: this.shot.color,
                direction: 'up',
                sound: 'laser-shot'
            });
            return shot;
        }
    }

    dying() {
        if (this.frame % 2 === 0) {
            let frameSprite = this.sprite.frame;
            if (frameSprite === 1 || frameSprite === 2 || frameSprite === 3) {
                frameSprite = 4;
                this.sound = 'explosion';
            } else {
                frameSprite++;
            }
            this.image = this.sprite.getFrame(frameSprite);
            if (frameSprite === 7) {
                this.status = 0;
                this.health = 0;
                this.sound = null;
            }
        }
    }

    restart() {
        this.status = 1;
        this.health = 100;
        this.positionX = 375;
        this.positionY = 375;
        this.score = 0;
        this.image = this.sprite.getFrame(1);
    }

    getAttributes() {
        return {
            uuid: this.uuid,
            class: this.class = 'Player',
            playerNumber: this.playerNumber,
            health: this.health,
            width: this.width,
            height: this.height,
            positionX: this.positionX,
            positionY: this.positionY,
            speed: this.speed,
            score: this.score,
            type: this.type = 'image',
            image: this.image = this.sprite.getFrame(1)
        }
    }
}

module.exports = Player;
