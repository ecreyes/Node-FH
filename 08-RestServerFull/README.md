# Rest Server.

## Instalaciones previas (Windows).
### MongoDB
Se utilizará MongoDB para la base de datos, por lo cual hay que ir a la página oficial de MongoDB y buscar el instalador. Una vez descargado colocar siguiente en el instalador y al finalizar se debe crear una carpeta `data` y `db` que debe quedar de la siguiente forma `C:\data\db`.
Ahora para encender la base de datos hay que ir a `C:\Program Files\MongoDB\Server\4.0\bin` y ejecutar el `mongod` por consola, se recomienda añadir esa ruta al path para ejecutar el `mongod` desde cualquier lugar.
### Robo 3T.
Para manejar la base de datos se utilizará Robo3T, hay que ir a la página oficial y descargar la versión gratuita.
Una vez instalado y con la base de datos corriendo,en `MongoDB connections` hacer click en `create`, se colocan los siguientes campos:
* name:Nombre de la conexión
* address: localhost
* port: 27017 (este se ve en mongod en la terminal)
Luego dar ok y se puede conectar a la base de datos.

## Peticiones HTTP.
Las peticiones http son utilizadas para comunicarse con el servidor, en este server se utilizaran:
* get (obtener datos)
* post (guardar un dato)
* put (actualizar un dato)
* delete (borrar un dato)

Para realizar estas peticiones se utilizará express y se generan de la siguiente forma:
```javascript
const express = require('express');
const app = express();
 
app.get('/usuario',(req, res)=> {
    res.json("get usuario");
});

app.post('/usuario',(req, res)=> {
    res.json("post usuario");
});

app.put('/usuario/:id',(req, res)=> {
    let id = req.params.id;
    res.json({
        id:id
    });
});

app.delete('/usuario',(req, res)=> {
    res.json("delete usuario");
});
 
app.listen(3000,()=>{
    console.log("Server ON puerto 3000");
});
```
La respuesta que se va a enviar es en formato json por eso es el `res.json`.

### Recibir parametros por url.
Si se quieren recibir parametros por url se debe indicar el parámetro en la direccion con un dos puntos, por ejemplo:
```javascript
app.put('/usuario/:id',(req, res)=> {
    let id = req.params.id;
    res.json({
        id:id
    });
});
```
ahi esa dirección espera recibir un parametro id y este se puede recibir con `req.params.id`, notese que si el parametro tiene otro nombre por ejemplo `x` se tendria que colocar en la dirección `:x` y se recibiria con `req.params.x`, todos los parametros recibidos se pueden mostrar con un `console.log(req.params)`

### Recibir parámetros por el body.
En la petición post se puede enviar mucha información, por ejemplo hay que ir a POSTMAN seleccionar POST, luego ir a la sección `BODY` y seleccionar `x-www-form-urlencoded`, ahi aparecen el key y value en los cuales se puede ingresar los campos con los valores que se desea enviar.
Para recibir estos parámetros en el servidor es necesario instalar el paquete `body parser`:
```javascript
npm install body-parser --save
```
luego en el archivo del server colocar:
```javascript
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
```
ahora simplemente para recibir los datos se puede hacer un `req.body` que trae todos los datos que fueron enviados, se le puede hacer un `console.log(req.body)` para ver los datos o una asignacion:
```javascript
let body = req.body;
```

## Enviar códigos de respuesta http.
Se pueden enviar códigos como el 400, 404 etc, para esto se utiliza lo siguiente, en la funcion que maneja la url
en el `res` usar:
```javascript
app.post('/usuario',(req, res)=> {
    let body = req.body;
    if(!body.nombre){
        res.status(400).json({
            ok:false,
            mensaje:"Falta el campo nombre"
        });
    }else{
        res.json(req.body);
    }
});
```
## Creando un archivo de configuración global.
Este archivo tendra toda la configuración de la aplicación es decir puertos, conexiones a bases de datos, heroku etc. Para lograr esto hay que crear una carpeta config dentro del server y un archivo config respectivo.
El archivo contiene lo siguiente:
```javascript
// ===================
//   Puerto
// ===================
process.env.PORT = process.env.PORT || 3000;
```
Ahora hay que hacer un require de este archivo y dejarlo en la primera linea del codigo del servidor para que cargue
todas estas variables globales.
Ejemplo:
```javascript
require('./config/config');
```
Ahora se puede cambiar el puerto con:
```javascript
app.listen(process.env.PORT,()=>{
    console.log(`Server ON puerto ${process.env.PORT}`);
});
```