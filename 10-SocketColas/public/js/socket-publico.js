var socket = io();

socket.on('estadoActual',function(data){
    if(data.ultimosCuatro.length>0){
        for(var i=0;i<data.ultimosCuatro.length;i++){
            var suma = i+1;
            var textTicket = '#lblTicket'+suma;
            var textEsc = '#lblEscritorio'+suma;
            $(textTicket).text('Ticket: '+data.ultimosCuatro[i].numero);
            $(textEsc).text('Escritorio: '+data.ultimosCuatro[i].escritorio);
        }
    }
});