const canvas = {
    obj: null,
    ctx: null,
    elements: null,
    addElement: function(id) {
        this.obj = document.getElementById(id);
        this.obj.width = 800;
        this.obj.height = 600;
        this.ctx = this.obj.getContext('2d');
        this.elements = [];
    },
    addElements: function(elements) {
        this.elements = elements;
    },
    render: function() {
        this.ctx.fillStyle = "#50beff";
        this.ctx.fillRect(0, 0, 800, 600);
        if(this.elements.length > 0){
            this.elements.map((e) => {
                if (e.type == 'rect') {
                    this.ctx.fillStyle = e.color;
                    this.ctx.fillRect(e.positionX, e.positionY, e.width, e.height);
                }
            })
        }
    },
    run: function() {
        canvas.render();
        window.requestAnimationFrame(canvas.run); 
    }
}