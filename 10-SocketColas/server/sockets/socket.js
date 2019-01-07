const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');
let ticketControl = new TicketControl();


io.on('connection', (client) => {
    client.on('siguienteTicket',(data,callback)=>{
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
        client.broadcast.emit('estadoActual',{actual:ticketControl.getUltimoTicket()});
    });

    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimosCuatro:ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:"El escritorio es necesario"
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('estadoActual',{ultimosCuatro:ticketControl.getUltimosCuatro()});
    });
});