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
luego en el archivo que se desea usar hay que escribir:
```javascript
const argv = require('yargs').argv
```
Ahora para empezar a usar este paquete, antes de el `.argv` se puede colocar `command` para los comandos en la terminal, estos son los que no tienen valores por ejemplo:
* listar
* crear

Los parametros de `command` son los siguientes:
```javascript
command('nombreComando','información de ayuda',{
    flag:{
        opciones
    },
    flag2:{
        opciones
    }
})
```
El nombre del comando a ejecutar, una descripción del comando y un objeto con los flags a usar en conjunto con el comando, ejemplo de uso:
```javascript
const argv = require('yargs')
                .command('listar','Muestra la tabla de multiplicar en pantalla',{
                    base:{
                        demand:true,
                        alias:'b'
                    },
                    limite:{
                        alias:'l',
                        default:10
                    }
                })
                .help()
                .argv
const {crearArchivo} = require('./multiplicar/multiplicar');

console.log(argv);
let base = argv.base;
let limite = argv.limite;
crearArchivo(base,limite).then(nombre=>{
    console.log('Se creó el archivo:',nombre);
},error=>{
    console.log(error);
});
```
Para mostrar las valores obtenidos por parametros se puede hacer `console.log(argv)` y obtener los datos como se muesta en el código.

### Optimización del cógigo yargs.
Las opciones que se repiten se puede crear un objeto de opciones y pasarse como parámetro, tambien el código se debe sacar del archivo de ejecución y escribirlo en otro archivo para que quede más limpio, luego exportarlo y usarlo normalmente, por ejemplo quedaria exportado asi:
```javascript
const opt = {
    base:{
        demand:true,
        alias:'b'
    },
    limite:{
        alias:'l',
        default:10
    }
};
const argv = require('yargs')
        .command('listar','Muestra la tabla de multiplicar en pantalla',opt)
        .command('crear','Crea un archivo txt con la tabla de multiplicar',opt)
        .help()
        .argv;

module.exports = {
    argv
};
```
y se importa de la siguiente forma:
```javascript
const argv = require('./config/yargs').argv;
```
## Colores en la consola.
Se pueden utilizar colores en la terminal instalando un paquete:
```javascript
npm install colors --save
```
luego requerir y colocar el color, por ejemplo:
```javascript
const colors = require('colors');
console.log('hello'.green); // outputs green text
```