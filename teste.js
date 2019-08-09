// const imageSize = require('image-size');
// const path = require('path');
// const image = imageSize(path.resolve(__dirname, 'public', 'img', 'player.png'));
// console.log(image)

const Player = require('./src/game/Player');
const player = new Player();
console.log(player.image);
player.moveLeft();
console.log(player.image);
player.moveRight();
console.log(player.image);
