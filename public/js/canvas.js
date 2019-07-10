class Canvas {
    constructor(id){
        this.canvas = document.getElementById(id);
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];
    }

    addElements(elements) {
        this.elements = elements;
    }

    render() {
        this.ctx.fillStyle = "#50beff";
        this.ctx.fillRect(0, 0, 800, 600);

        console.log(this.elements);
        if(this.elements.length > 0){
            this.elements.map((e) => {
                if (e.type == 'rect') {
                    this.ctx.fillStyle = e.color;
                    this.ctx.fillRect(e.positionX, e.positionY, e.width, e.height);
                }
            })
        }
    }

    play() {
        this.render();
        window.requestAnimationFrame(this.play);
    }
}
