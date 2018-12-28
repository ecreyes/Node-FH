const argv = require('./config/yargs').argv;
const todo = require('./toDo/todo');
let comando = argv._[0];
switch(comando){
    case 'crear':
        let tarea = todo.crear(argv.descripcion);
        break;
    case  'listar':
        todo.listar();
        break;
    case 'actualizar':
        todo.actualizar(argv.descripcion,argv.completado);
        break;
    case 'borrar':
        todo.borrar(argv.descripcion);
        break;
    default:
        console.log("comando no reconocido");
}