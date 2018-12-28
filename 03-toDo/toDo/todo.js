const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = ()=>{
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw err;
    });
};

const leerDB = ()=>{
    try{
        let data = require('../db/data.json');
        listadoPorHacer = data;
    }catch(error){
        listadoPorHacer = [];
    }
};

let crear = (descripcion)=>{
    leerDB();
    let porHacer = {
        descripcion:descripcion,
        completado:false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

let listar = ()=>{
    leerDB();
    listadoPorHacer.forEach(i=>{
        console.log("======TAREA======".green);
        console.log(i.descripcion);
        console.log(i.completado);
    });
}

let borrar = (descripcion)=>{
    let borrado = false;
    leerDB();
    for(let i=0;i<listadoPorHacer.length;i++){
        if(listadoPorHacer[i].descripcion.toLowerCase()==descripcion.toLowerCase()){
            borrado = true;
            listadoPorHacer.splice(i,1);
        }
    }
    guardarDB();
    return borrado;
};

let actualizar = (descripcion,completado)=>{
    leerDB();
    let dato = {};
    for(let i=0;i<listadoPorHacer.length;i++){
        if(listadoPorHacer[i].descripcion.toLowerCase()==descripcion.toLowerCase()){
            listadoPorHacer[i].descripcion = descripcion;
            listadoPorHacer[i].completado = completado;
        }
    }
    guardarDB();
};

module.exports = {
    crear,
    listar,
    borrar,
    actualizar
}