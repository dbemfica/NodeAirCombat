document.addEventListener("keydown", event => {
    //LEFT
    if(event.keyCode === 37){
        socket.emit('move_left', true);
    }
    //UP
    if(event.keyCode === 38){
        socket.emit('move_up', true);
    }
    //RIGHT
    if(event.keyCode === 39){
        socket.emit('move_right', true);
    }
    //DOWN
    if(event.keyCode === 40){
        socket.emit('move_down', true);
    }
    //FIRE
    if(event.keyCode === 32){
        socket.emit('fire', true);
    }
});