const {io} = require('../server');
io.on('connection',(client)=>{
    console.log('Usuario conectado');

    client.emit('enviarMensaje',{
        usuario:'Administrador',
        mensaje:'Bienvenido a la aplicación'
    });

    client.on('disconnect',()=>{
        console.log('cliente se ha desconectado!.');
    });

    client.on('enviarMensaje',(data,callback)=>{
        console.log(data);
        if(data.mensaje){
            callback({
                ok:true,
                mensaje:"Mensaje recibido correctamente"
            });
        }else{
            callback({
                ok:false,
                mensaje:'Error al recibir el mensaje'
            });
        }
        client.broadcast.emit('enviarMensaje',data);
    });
});