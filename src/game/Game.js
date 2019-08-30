const path = require('path');
const imageSize = require('image-size');
const Enemy = require('./Enemy');

class Game {
    constructor(){
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

    pause() {
        this.status = 0;
    }

    addElement(element) {
        if (element.class == 'Player') {
            if (this.playersStatus.length === 0) {
                let status = {
                    socketId: element.socket,
                    health: 100,
                    score: 0
                }
                this.playersStatus.push(status);
            } else {
                for (let i = 0; i < this.playersStatus.length; i++) {
                    if (this.playersStatus[i].socketId !== element.socket) {
                        let status = {
                            socketId: element.socket,
                            health: 100,
                            score: 0
                        }
                        this.playersStatus.push(status);
                    }
                }
            }
        }
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
        this.backgroundUpdate();
        this.colision();
        this.removeElements();
        this.addEnemy();
        this.enemyFire();
        this.updatePlayersStatus();
    }

    updatePlayersStatus() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].class === 'Player') {
                for (let x = 0; x < this.playersStatus.length; x++) {
                    if (this.playersStatus[x].socketId === this.elements[i].socket) {
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

    removeElement(element) {
        if (element.class == 'Player') {
            for (let i = 0; i < this.playersStatus.length; i++) {
                if (this.playersStatus[i].socketId !== element.socket) {
                    this.playersStatus.splice(element, 1);
                }
            }
        }
        this.elements.splice(element, 1);
    }

    removeElements() {
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

    findPlayer(socket) {
        if (this.elements.length > 0) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].socket === undefined) {
                    continue;
                }
                if (this.elements[i].socket === socket) {
                    return this.elements[i];
                }
            }
        }
    }
}

module.exports = Game;
