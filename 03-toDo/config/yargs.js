const argv = require('yargs')
        .command('crear','Crear un elemento por hacer',{
            descripcion:{
                demand:true,
                alias:'d',
                desc: 'Descripción de la tarea por hacer'
            }
        })
        .command('actualizar','Actualiza el estado completado de una tarea',{
            descripcion:{
                demand:true,
                alias:'d'
            },
            completado:{
                default:true,
                alias:'c',
                desc: 'Marca como completado o pendiente la tarea'
            }
        })
        .help()
        .argv;

module.exports = {
    argv
}