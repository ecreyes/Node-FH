var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect',function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect',function(){
    console.log('Perdimos conexón con el servidor.');
});

socket.on('estadoActual',function(resp){
    label.text('Ticket: '+resp.actual);
});

$('button').on('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    });
});