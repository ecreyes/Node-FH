const {crearArchivo} = require('./multiplicar/multiplicar');

let base = 3;


crearArchivo(base).then(nombre=>{
    console.log('Se creó el archivo:',nombre);
},error=>{
    console.log(error);
});