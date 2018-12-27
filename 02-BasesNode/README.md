# Bases de node.
Node trae paquetes que pueden ser usados por defecto sin necesidar de instalar otro paquete con npm,
para usar estos paquetes hay que ver la version que esta instalada de node:
```bash
node -v
```
Luego ir a [https://nodejs.org/es/docs/](Documentación de Node) y buscar la documentación dependiendo de la versión, ahi se encontraran los paquetes que se pueden utilizar por defecto.
## Requerir paquetes.
Para usar un paquete, por ejemplo el de filesystem para escribir y leer ficheros desde node se debe escribir lo siguiente:
```javascript
const fs = require('fs');
```
Notar que cuando se requiere de la forma anterior es porque el paquete esta instalado, pero si quisieramos importar
un directorio que creamos hay que poner el `./` por ejemplo:
```javascript
const nombreArchivo = require('./ubicacionArchivo');
```
Para escribir y crear un documento se utiliza:
```javascript
fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
    if (err) throw err;
    console.log(`El archivo tabla-${base}.txt fue creado correctamente.`);
});
```
El directorio `tablas` debe ser creado anteriormente y `data` son todos los strings que se quieren añadir al documento.

### Haciendo el código modular.
Si hay código que puede ser separado ya sea por la logica o por que no esta relacionado se puede dejar en otro archivo, por ejemplo asi:
```javascript
const fs = require('fs');
let crearArchivo = (base)=>{
    return new Promise((resolve,reject)=>{
        let data = "";
        for(let i=1; i<=10;i++){
            data += `${base}*${i} = ${base*i}\n`;
        }
    
        fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
            if (err){
                reject("El archivo no se pudo crear");
                return;
            }
            resolve(`tabla-${base}.txt`);
            return;
        });
    });
};

let sumar = (a,b)=>a+b;

module.exports = {
    crearArchivo,
    sumar
}
```
Ahí se crearon dos funciones y se exportaron usando el `module.exports`, ahora para importar esas funciones en el archivo que se desea utilizar hay que usas destructuración:
```javascript
const {crearArchivo,sumar} = require('./multiplicar/multiplicar');
```
perfectamente se puede importar solo un archivo con:
```javascript
const {crearArchivo} = require('./multiplicar/multiplicar');
```

## Recibiendo parámetros por terminal con yargs.
Para instalar yargs hay que primero crear un package.json y luego hacer:
```javascript
npm i yargs --save
```