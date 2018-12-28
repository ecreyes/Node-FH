const argv = require('./config/yargs').argv;
const colors = require('colors');
const {crearArchivo,listarArchivo} = require('./multiplicar/multiplicar');

console.log(argv);
let base = argv.base;
let limite = argv.limite;
if(argv._[0]=='listar'){
    listarArchivo(base,limite).then(data=>{
        console.log(`Listando tabla ${base}`.green);
        console.log(data);
    },error=>{
        console.log(error);
    })
}else if(argv._[0]=='crear'){
    crearArchivo(base,limite).then(nombre=>{
        console.log('Se creó el archivo:'.green,nombre);
    },error=>{
        console.log(error);
    });
}else{
    console.log("comando no válido".red);
}