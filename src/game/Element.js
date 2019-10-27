const uuidv4 = require('uuid/v4');

class Element {
    constructor() {
        this.uuid = uuidv4();
        this.health = 0;
        this.frame = 0;
        this.class = 'Element';
        this.score = 0;
        this.sound = null;
        this.status = 1;
    }

    addScore(score) {
        this.score += score;
    }

    update(){};
    colision(){};
    sufferDamage(){};

    getAttributes() {
        return {
            uuid: this.uuid,
            class: this.class,
            playerNumber: this.playerNumber,
            width: this.width,
            height: this.height,
            positionX: this.positionX,
            positionY: this.positionY,
            lenght: this.lenght,
            color: this.color,
            type: this.type,
            image: this.image,
            sound: this.sound
        }
    }
}

module.exports = Element;
