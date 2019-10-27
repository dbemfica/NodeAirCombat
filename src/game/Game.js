const path = require('path');
const imageSize = require('image-size');
const Enemy = require('./Enemy');
const Player = require('./Player');

class Game {
    constructor(config){
        this.config = config;
        this.payload = null;
        this.connectedPlayers = [null, null];
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
        if (this.status === 0) {
            this.status = 1;
        }
    }

    addPlayer() {
        let connectedPlayersLenght = this.connectedPlayers.length;
        let slot = null;
        let busySlots = 0;
        for (let i = 0; i < connectedPlayersLenght; i++) {
            if (this.connectedPlayers[i] !== null) {
                busySlots++;
            }
            if (busySlots > 2) {
                return false;
            }
            if (this.connectedPlayers[i] === null && slot === null) {
                slot = i;
            }
        }

        let numberPlayer = slot + 1;
        let avatar = null;
        if (numberPlayer === 1) {
            avatar = 'player.png';
        } else if (numberPlayer === 2) {
            avatar = 'player2.png';
        }

        let player = new Player(this.config, numberPlayer, avatar);

        this.connectedPlayers[slot] = player;
        this.addElement(player);
        return slot;
    }

    addElement(element) {
        this.elements.push(element);
    }

    removeAllElements() {
        this.elements = [];
    }

    update() {
        this.frame++;
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                this.elements[i].update();
            }
        }
        this.gameover();
        this.updatePayload();
        this.backgroundUpdate();
        this.clearElements();
        this.colision();
        this.addEnemy();
        this.enemyFire();
    }

    backgroundUpdate() {
        if (this.frame %2 === 0) {
            this.background[0].y += 1;
            this.background[1].y += 1;
            if (this.background[0].y >= 600) {
                this.background[0].y = (this.imgBg.height + (this.imgBg.height - 600)) * -1;
            }
            if (this.background[1].y >= 600) {
                this.background[1].y = (this.imgBg.height + (this.imgBg.height - 600)) * -1;
            }
        }
    }

    removeElement(index) {
        this.elements.splice(index, 1);
    }

    clearElements() {
        let num = this.elements.length;
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                if (this.elements[i].status === 0) {
                    if (this.elements[i].class !== 'Player') {
                        this.removeElement(i);
                        this.clearElements();
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
            const enemy = new Enemy({positionX: Math.random() * (600 - 40) + 0});
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
        let connectedPlayersLenght = this.connectedPlayers.length;
        for (let i = 0; i < connectedPlayersLenght; i++) {
            if (this.connectedPlayers[i] !== null) {
                health += this.connectedPlayers[i].health;
            }
        }

        if (health === 0) {
            this.status = 2;
        }
    }

    restart() {
        this.frame = 0;
        this.status = 1;

        let connectedPlayers = this.connectedPlayers;
        this.connectedPlayers = [null, null];
        this.removeAllElements();

        for (let i = 0; i < connectedPlayers.length; i++) {
            if (connectedPlayers[i] !== null) {
                connectedPlayers[i].restart();
                this.connectedPlayers[i] = connectedPlayers[i];
                this.addElement(connectedPlayers[i]);
            }
        }

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

    disconnectPlayer(index) {
        let player = this.connectedPlayers[index];
        this.connectedPlayers[index] = null;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].uuid === player.uuid) {
                this.elements.splice(i, 1);
                return true;
            }
        }
    }

    updatePayload() {
        this.payload = {};
        this.payload.background = this.background;
        this.payload.config = this.config;

        this.payload.connectedPlayers = [];
        for (let i = 0; i < this.connectedPlayers.length; i++) {
            if (this.connectedPlayers[i] !== null) {
                this.payload.connectedPlayers.push(this.connectedPlayers[i].getState());
            }
        }

        this.payload.elements = [];
        for (let i = 0; i < this.elements.length; i++) {
            this.payload.elements.push(this.elements[i].getAttributes());
        }

        this.payload.frame = this.frame;
        this.payload.status = this.status;
    }
}

module.exports = Game;
