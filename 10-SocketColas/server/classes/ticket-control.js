const fs = require('fs');

class Ticket{
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        let data = require('../data/data.json');
        if(this.hoy == data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        }
        else{
            this.reiniciarConteo();
            this.tickets = [];
        }
    }

    siguiente(){
        this.ultimo +=1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket: ${this.ultimo}`;
    }

    atenderTicket(escritorio){
        if(this.tickets.length==0){
            return 'No hay tickets.';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let ticket = new Ticket(numeroTicket,escritorio);
        this.ultimosCuatro.unshift(ticket);
        if(this.ultimosCuatro.length>4){
            this.ultimosCuatro.splice(-1,1);
        }
        console.log("ultimos cuatro:",this.ultimosCuatro);
        this.grabarArchivo();
        return ticket;
    }

    getUltimoTicket(){
        return this.ultimo;
    }

    getUltimosCuatro(){
        return this.ultimosCuatro;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        this.grabarArchivo();
        console.log("Se ha inicializado el sistema.")
    }

    grabarArchivo(){
        let objeto = {
            ultimo:this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
        let objetoString = JSON.stringify(objeto);
        fs.writeFileSync('./server/data/data.json',objetoString);
    }
}

module.exports = {
    TicketControl
}