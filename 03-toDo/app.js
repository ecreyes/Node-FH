const argv = require('./config/yargs').argv;
console.log(argv);
let comando = argv._[0];
switch(comando){
    case 'crear':
        console.log("comando crear");
        break;
    case  'listar':
        console.log("comando listar");
        break;
    case 'actualizar':
        console.log("comando actualizar");
        break;
    default:
        console.log("comando no reconocido");
}