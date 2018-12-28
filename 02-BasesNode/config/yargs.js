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