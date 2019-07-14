const player = require('./Player');

class Game {
    constructor(io){
        this.elements = [];
        this.elements[0] = player;

        setInterval(() => {
            this.removeElement();
        }, process.env.FRAME_RATE)
    }

    addElement(element) {
        this.elements.push(element);
    }

    removeElement() {
        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].positionX > 900 || this.elements[i].positionX < -100) {
                    this.elements.splice(i, 1);
                }
                if (this.elements[i].positionY > 900 || this.elements[i].positionY < -100) {
                    this.elements.splice(i, 1);
                }
            }
        }
    }
}

module.exports = new Game();