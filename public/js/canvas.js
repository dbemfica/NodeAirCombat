const canvas = {
    obj: null,
    ctx: null,
    elements: null,
    addElement: function(id) {
        this.obj = document.getElementById(id);
        this.obj.width = 600;
        this.obj.height = 600;
        this.ctx = this.obj.getContext('2d');
        this.elements = [];
        this.background = null;
    },
    loadBackground: function(background) {
        this.background = background;
    },
    addElements: function(elements) {
        this.elements = elements;
    },
    render: function() {
        this.ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        if (this.background !== null) {
            this.ctx.drawImage(imageBackgroud, this.background[0].x, this.background[0].y);
            this.ctx.drawImage(imageBackgroud, this.background[1].x, this.background[1].y);
        } else {
            this.ctx.fillStyle = "#50beff";
            this.ctx.fillRect(0, 0, 800, 600);
        }

        if(this.elements.length > 0){
            this.elements.map((e) => {
                if(e.class === 'Player') {
                    health = e.health;
                    score = e.score;
                }
                if (e.type === 'rect') {
                    this.ctx.fillStyle = e.color;
                    this.ctx.fillRect(e.positionX, e.positionY, e.width, e.height);
                }
                if (e.type === 'circle') {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = e.color;
                    this.ctx.arc(e.positionX, e.positionY, e.lenght, 0, 2*Math.PI);
                    this.ctx.fill();
                }
                if (e.class === 'Player' && e.type === 'image') {
                    if (e.image !== undefined && e.image !== null) {
                        let img = e.image;
                        this.ctx.drawImage(imgPlayer, img.sx, img.sy, img.sWidth, img.sHeight, e.positionX, e.positionY, img.dWidth, img.dHeight);
                    }
                }
                if (e.class === 'Enemy' && e.type === 'image') {
                    if (e.image !== undefined && e.image !== null) {
                        let img = e.image;
                        this.ctx.drawImage(imgEnemy, img.sx, img.sy, img.sWidth, img.sHeight, e.positionX, e.positionY, img.dWidth, img.dHeight);
                    }
                }
            })
        }
    },
    run: function() {
        canvas.render();
        window.requestAnimationFrame(canvas.run);
    }
}
