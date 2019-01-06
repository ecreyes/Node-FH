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
El `client.on()` estara escuchando en caso de que ocurra el evento ``disconnect`.

## Emitir desde el cliente y escuchar en el servidor
Los `emit` siempre son para enviar información, los `on` para escuchar los eventos. La forma de emitir algo es la siguiente:
```javascript
socket.emit('enviarMensaje',{
    usuario:"Eduardo",
    mensaje:"Hola mundo!"
});
```
son dos parámetros el primero va a ser el tag o identificador de lo que se emite, el segundo es un objeto con parámetros que se envian, igual no necesariamente podria ser un objeto tambien podria ser cualquier valor.
Ahora hay que escuchar esta información del lado del servidor, esto se hace con:
```javascript
io.on('connection',(client)=>{
    console.log('Usuario conectado');
    client.on('disconnect',()=>{
        console.log('cliente se ha desconectado!.');
    });

    client.on('enviarMensaje',(data)=>{
        console.log(data);
    });
});
```
recordar que siempre se escribe dentro del `io.on` del lado del servidor, para escuchar entonces se utiliza el cliente.on se le dice que evento escuchar y con un callback que contiene un parametro con la data de lo que se emitio del cliente al servidor.

## Emitir desde el servidor, escuchar en el cliente.
Esto es exactamente igual que el caso anterior solo que al reves, por ejemplo en el lado del servidor:
```javascript
client.emit('enviarMensaje',{
    usuario:'Administrador',
    mensaje:'Bienvenido a la aplicación'
});
```
En el lado del cliente:
```javascript
socket.on('enviarMensaje',function(data){
    console.log(data);
});
```
## Retroalimentación de emisores del cliente hacia el servidor.
La idea ahora es confirmar que un mensaje se recibió correctamente, por ejemplo cuando un cliente hace un emit seria util saber si el servidor recibio correctamente este mensaje y poder notificar.

En el lado del cliente se quiere emitir el siguiente mensaje:
```javascript
socket.emit('enviarMensaje',{
    usuario:"Eduardo",
    mensaje:"Hola mundo!"
},function(res){
    console.log(res);
});
```
notar que ahora se agrego un tercer parámetro y este es un callback que va a recibir una respuesta del servidor.
Los parametros en total son:
* tag o identificar
* dato enviar
* callback

Ahora desde el servidor cuando se escuche el evento se puede confirmar respondiendo el callback:
```javascript
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
});
```
Si en la data recibida existe el mensaje se responde con un callback confirmando, sino se responde con callback diciendo que ocurrio un error.

## Ordenar archivos de cliente y servidor de forma independiente.
Para el cliente se tiene que crer una carpeta de `js` luego mandar todo el código a un archivo dentro de esa carpeta y luego importarlo al html.

Para el servidor:
en el archivo server se cambia esto:
```javascript
module.exports.io = socketIO(server);
require('./sockets/socket');
```
Se crea una nueva carpeta `sockets` dentro del server y se crea un archivo `sockets.js` con lo siguiente:
```javascript
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
    });
});
```
## Emitir a todos los usuarios BROADCAST.
Basicamente desde el servidor hay que hacer el broadcast hacia los demás cuando se recibe el mensaje, esto se hace con:
```javascript
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
```
