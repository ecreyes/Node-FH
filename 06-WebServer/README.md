# WebServer en Nodejs.

## Express.
Express se usara para realizar peticiones http, este reeemplaraza al paquete http ya que indirectamnte lo usa y añade más funcionalidades, la forma de instalarlo es:
```javascript
npm install --save express
```
ahora para utilizar exprees se coloca lo que sale en el sitio de express:
```javascript
const express = require('express');
const app = express();
 
app.get('/',(req, res)=> {
  res.send('Hola mundo');
});
 
app.listen(3000,()=>{
    console.log("Server ON puerto 3000");
});
```
El beneficio de usar express es que permite utilizar rutas, además se pueden enviar objetos directamente para montar un servidor de API.
```javascript
app.get('/',(req, res)=> {
  let objeto = {
    id: 1,
    nombre: "Eduardo"
  };
  res.send(objeto);
});
```

## Servir contenido estático.
Para crear contenido publico, por ejemplo para tener css o js se puede crear una carpeta `public`, dentro de esa carpeta se puede colocar los archivos, ahora en el archivo del servidor se puede colocar:
```javascript
app.use(express.static(__dirname+'/public'));
```
hay que tener cuidado si se crea un archivo `index.html` en la carpeta public porque este respondera a la ruta `localhost:3000` es decir la dirección root, si un servicio esta usando la misma dirección root el index lo reemplazara, ahora si se desea acceder a otro archivo por ejemplo un `home.html` solo hay que acceder con `localhost:3000/home.html` si se coloca solamente `localhost:3000/home` no se podrá acceder porque esa podría ser una dirección de un servicio.
El `__dirname` es para obtener la dirección actual de donde se encuentra el servidor y se concatena con la carpeta public creada.

## Heroku.
Primero se crea una cuenta en heroku y en el dashboard hacer click en new para agregar un nuevo proyecto, luego en la sección `deploy` hay un link en la sección `Deploy using Heroku Git` para descargar heroku en windows, se descarga el instalador, se da siguiente a todo y despues se puede revisar en una terminal con:
```javascript
heroku -v
```
si aparece la versión es porque esta instalado correctamente.
Luego en el archivo del servidor hay que crear una variable que maneje el puerto ya que por default nosotros pusimos 3000 pero puede que heroku nos de otro puero, por lo que hay que colocar:
```javascript
const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log(`Server ON puerto ${port}`);
});
```
se coloca ese valor y se actualiza el listen, la sentencia se explica de la siguiente forma, si existe una variable PORT en proces.env se asigna ese valor, sino se asigna 3000.

Ahora en el package.json hay que decirle a heroku como inciar el servidor, para esto en la sección de scripts se agrega un comando reservado de nombre `start`, por ejemplo:
```javascript
  "scripts": {
    "start":"node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
esto se puede probar con el comando:
```javascript
npm start
```
como start es una palabra reservada si por ejemplo se desea agregar nodemon con el comando a ejecutar, este debe correrse con:
```javascript
npm run nombreComando
```
Para subir ahrora el proyecto a heroku hay que hacer el git add con git commit del proyecto y el push se hace a heroku.

Para hacer el push a heroku se tiene que hacer login, esto se hace unicamente una vez por maquina, se hace con:
```javascript
heroku login
```
Una vez logeado ir a la sección `deploy` luego a `Deploy using Heroku Git` y hay que inicializar el proyecto, esto aparece en `Create a new Git repository`, hacer el `git init` y el:
```javascript
heroku git:remote -a nombreAppEnHeroku
```
esos datos se sacan del sitio web, no preocuparse tanto xD

finalmente para hacer el push a heroku es con:
```javascript
git push heroku master
```
ahora para ver la direccion del proyecto en la nube se puede hacer con:
```javascript
heroku open
```
