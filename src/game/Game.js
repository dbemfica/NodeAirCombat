const path = require('path');
const imageSize = require('image-size');
const Enemy = require('./Enemy');

class Game {
    constructor(config){
        this.config = config;
        this.playersStatus = [];
        this.frame = 0;
        this.status = 0;
        this.elements = [];

        this.imgBg = imageSize(path.resolve(__dirname, '..', '..', 'public', 'img', 'map.png'));
        this.background = [
            {
                x: 0,
                y: (this.imgBg.height - 600) * -1
            },
            {
                x: 0,
                y: ((this.imgBg.height + this.imgBg.height) - 600) * -1
            }
        ]
    }

    start() {
        this.status = 1;
    }

    addPlayer(element) {
        const status = {
            uuid: element.uuid,
            health: 100,
            score: 0
        }
        this.playersStatus.push(status);
        return this.addElement(element);
    }

    addElement(element) {
        this.elements.push(element);
        return element;
    }

    update() {
        this.frame++;
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                this.elements[i].update();
            }
        }
        this.backgroundUpdate();
        this.removeElements();
        this.colision();
        this.addEnemy();
        this.enemyFire();
        this.updatePlayersStatus();
        this.gameover();
    }

    updatePlayersStatus() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].class === 'Player') {
                for (let x = 0; x < this.playersStatus.length; x++) {
                    if (this.playersStatus[x].uuid === this.elements[i].uuid) {
                        this.playersStatus[x].health = this.elements[i].health;
                        this.playersStatus[x].score = this.elements[i].score;
                    }
                }
            }
        }
    }

    backgroundUpdate() {
        if (this.frame %2 === 0) {
            this.background[0].y += 1;
            this.background[1].y += 1;
        }
        if (this.background[0].y > 600) {
            this.background[0].y = (this.imgBg.height + (this.imgBg.height - 601)) * -1;
        }
        if (this.background[1].y > 600) {
            this.background[1].y = (this.imgBg.height + (this.imgBg.height - 600)) * -1;
        }
    }

    removePlayer(element) {
        for (let i = 0; i < this.playersStatus.length; i++) {
            if (this.playersStatus[i].uuid === element.uuid) {
                this.playersStatus.splice(i, 1);
                break;
            }
        }
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                if (this.elements[i].uuid === element.uuid) {
                    this.removeElement(i);
                    break;
                }
            }
        }
    }

    removeElement(i) {
        this.elements.splice(i, 1);
    }

    removeElements() {
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                if (this.elements[i].status === 0) {
                    if (this.elements[i].class === 'Player') {
                        this.removePlayer(this.elements[i]);
                        this.removeElements();
                        break;
                    } else {
                        this.removeElement(i);
                        this.removeElements();
                        break;
                    }
                }
            }
        }
    }

    colision() {
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                let e1 = this.elements[i];
                if (e1.status !== 1) {
                    continue;
                }
                let e1x1 = e1.positionX;
                let e1x2 = e1.positionX+e1.width;
                let e1y1 = e1.positionY;
                let e1y2 = e1.positionY+e1.height;
                for (let x = 0; x < num; x++) {
                    if (this.elements[i].uuid === this.elements[x].uuid) {
                        continue;
                    }
                    if (this.elements[i].class === this.elements[x].class) {
                        continue;
                    }
                    let e2 = this.elements[x];
                    let e2x1 = e2.positionX;
                    let e2x2 = e2.positionX+e2.width;
                    let e2y1 = e2.positionY;
                    let e2y2 = e2.positionY+e2.height;

                    if (e1x2 >= e2x1 && e1y2 >= e2y1 && e1x1 <= e2x2 && e1y2 >= e2y1 && e1x2 >= e2x1 && e1y1 <= e2y2 && e1x1 <= e2x2 && e1y1 <= e2y2) {
                        e1.sufferDamage(e2.damage);
                        if (e1.class === 'Shot' && e1.shooter !== undefined) {
                            e1.shooter.addScore(1);
                        }
                        continue;
                    }
                }
            }
        }
    }

    addEnemy() {
        if (this.frame % 300 === 0) {
            const enemy = new Enemy({positionX: Math.random() * (600 - 0) + 0});
            this.addElement(enemy);
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
                    this.addElement(fire);
                }
            }
        }
    }

    gameover() {
        let health = 0;
        let playersStatus = this.playersStatus.length;
        for (let i = 0; i < playersStatus; i++) {
            if (this.playersStatus[i].health <= 0) {
                health++;
            }
        }
        if (playersStatus === health) {
            this.status = 2;
        }
    }
}

module.exports = Game;
