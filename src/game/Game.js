const Enemy = require('./Enemy');

class Game {
    constructor(io){
        this.frame = 0;
        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
        return this.elements.length-1;
    }

    update() {
        this.frame++;

        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].update();
            }
        }
        this.colision();
        this.removeElement();
        this.addEnemy();
        this.enemyFire();
    }

    removeElement() {
        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].health <= 0) {
                    this.elements.splice(i, 1);
                    continue;
                }
                if (this.elements[i].positionX > 900 || this.elements[i].positionX < -100) {
                    this.elements.splice(i, 1);
                    continue;
                }
                if (this.elements[i].positionY > 900 || this.elements[i].positionY < -100) {
                    this.elements.splice(i, 1);
                    continue;
                }
            }
        }
    }

    colision() {
        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                let e1 = this.elements[i];
                let e1x1 = e1.positionX;
                let e1x2 = e1.positionX+e1.width;
                let e1y1 = e1.positionY;
                let e1y2 = e1.positionY+e1.height;
                for (let x = 0; x < this.elements.length; x++) {
                    if (this.elements[i].uuid === this.elements[x].uuid) {
                        continue;
                    }
                    let e2 = this.elements[x];
                    let e2x1 = e2.positionX;
                    let e2x2 = e2.positionX+e2.width;
                    let e2y1 = e2.positionY;
                    let e2y2 = e2.positionY+e2.height;
                    
                    if (e1x2 >= e2x1 && e1y2 >= e2y1 && e1x1 <= e2x2 && e1y2 >= e2y1 && e1x2 >= e2x1 && e1y1 <= e2y2 && e1x1 <= e2x2 && e1y1 <= e2y2) {
                        e1.colision(e2);
                        continue;
                    }
                }
            }
        }
    }

    addEnemy() {
        if (this.frame % 300 === 0) {
            this.elements[this.elements.length] = new Enemy({positionX: Math.random() * (800 - 0) + 0});
            console.log(this.elements[1] instanceof Enemy);
        }
    }

    enemyFire() {
        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                let fire = null;
                if (this.elements[i] instanceof Enemy) {
                    fire = this.elements[i].fire();
                }
                if (fire !== null) {
                    this.elements[this.elements.length] = fire;
                }
            }
        }
    }
}

module.exports = new Game();