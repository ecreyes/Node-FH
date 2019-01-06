var socket = io();
        
socket.on('connect',function(){
    console.log('conectado al servidor');
});

socket.on('disconnect',function(){
    console.log('Perdimos conexón con el servidor.');
});

socket.emit('enviarMensaje',{
    usuario:"Eduardo",
    mensaje:"Hola mundo!"
},function(res){
    console.log(res);
});

socket.on('enviarMensaje',function(data){
    console.log(data);
});