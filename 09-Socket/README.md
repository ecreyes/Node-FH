# Sockets
Los sockets son útiles porque permiten mantener conexiones entre cliente y servidor de forma continua, además esto permite hacer uso de datos en tiempo real, como actualizaciones o notificaciones.

## Instalaciones necesarias.
Para usar sockets en nodejs hay que primero instalarlo con:
```javascript
npm install socket.io --save
```
Luego hay que configuar el paquete con express, esto se hace con:
```javascript
const express = require('express');
const app = express();

//path y public.
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//puerto
const port = process.env.PORT || 3000;

//socket implementación
const socketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app);
let io = socketIO(server);

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});
```
para verificar si todo se instala correctamente ir a `http://localhost:3000/socket.io/socket.io.js` y ver el código js que aparece.

## Configuración de socket Front-End.
Una vez instalado todo correctamente hay que ir al html respectivo y agregar los siguientes scripts:
```html
<script src="socket.io/socket.io.js"></script>
<script>
    var socket = io();
    //conexión al servidor
    socket.on('connect',function(){
        console.log('conectado al servidor');
    });
</script>
```
La constante que siempre tiene que utilizarse al principio es `var socket = io();` esa constante nace al instalar el paquete.Este io servirá para establecer las comunicaciones.
la segunda funcion establece la conexión al servidor con el socket, es decir solo con esa linea desde ahora el cliente o frontend estara atento a todo lo que ocurra en el servidor.

Ahora para saber desde el servidor cuando usuario se conecta a este se utiliza lo siguiente:
```javascript
io.on('connection',(client)=>{
    console.log('Usuario conectado');
});
```
Es decir ahora cualquier cliente que se conecte al servidor utilizando socket, el servidor recibira esa conexión mantiendo el "activo-activo", en la función anterior y además recivira toda la información del cliente que se conecto en el parametro `client`.

## Detectar desconexiones del cliente y del servidor.
Del lado del cliente se ingresa el siguiente código:
```javascript
socket.on('disconnect',function(){
    console.log('Perdimos conexón con el servidor.');
});
```
Si ocurre el evento `disconnect` desde el lado del cliente, significa que el servidor se ha desconectado, en cambio si uno quiere saber en el servidor si un cliente se ha desconectado se ingresa lo siguiende dentro del `io.on()`
```javascript
io.on('connection',(client)=>{
    console.log('Usuario conectado');

    client.on('disconnect',()=>{
        console.log('cliente se ha desconectado!.');
    });
});
```
El `client.on()` estara escuchando en caso de que ocurra el evento ``disconnect`