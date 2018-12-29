# App del clima.

## Yargs.
Si no se necesita de un comando para utilzar yargs y solamente flags se puede hacer con:
```javascript
const argv = require('yargs')
    .options({
        direccion:{
            alias:'d',
            demand:true
        }
    })
    .argv;
```
## Axios.
Axios permite hacer peticiones http al igual que la libreria request, solo que esta permite trabajar con promesas y asi usar el async con await en vez de request que utiliza callbacks, para usar axios se instala con:
```javascript
npm install --save axios
```
se usa con:
```javascript
const axios = require('axios');
```
