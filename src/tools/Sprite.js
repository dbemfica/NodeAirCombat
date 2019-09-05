const path = require('path');
const imageSize = require('image-size');


class Sprite {
    constructor(src, nFrames) {
        this.image = imageSize(src);
        this.width = this.image.width;
        this.height = this.image.height;

        this.frame = null;
        this.nFrames = nFrames;
        this.frames = [];
        this.makeFrames();
    }

    makeFrames() {
        let frameWidth = this.width / this.nFrames;
        for (let i = 1; i <= this.nFrames; i++) {
            let frame = {}
            frame.sx = parseInt((frameWidth*i)-frameWidth);
            frame.sy = 0;
            frame.sWidth = frameWidth;
            frame.sHeight = this.height;
            frame.dx = null;
            frame.dy = null;
            frame.dWidth = frameWidth;
            frame.dHeight = this.height;
            this.frames.push(frame)
        }
    }

    getFrame(i) {
        this.frame = i;
        return this.frames[(this.frame-1)];
    }
}

module.exports = Sprite;
