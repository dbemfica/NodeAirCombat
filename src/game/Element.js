const uuidv4 = require('uuid/v4');

class Element {
    constructor() {
        this.uuid = uuidv4();
        this.health = 0;
        this.frame = 0;
        this.class = 'Element';
        this.score = 0;
        this.sound = null;
    }

    addScore(score) {
        this.score += score;
    }

    update(){};
    colision(){};
    sufferDamage(){};
}

module.exports = Element;
