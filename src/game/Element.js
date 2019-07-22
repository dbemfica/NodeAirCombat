const uuidv4 = require('uuid/v4');

class Element {
    constructor() {
        this.uuid = uuidv4();
        this.health = 0;
    }

    update(){};
    colision(){};
    sufferDamage(){};
}

module.exports = Element;