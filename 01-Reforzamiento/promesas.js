let empleados = [
    {
        id:1,
        nombre:"Eduardo"
    },
    {
        id:2,
        nombre:"Carlos"
    },
    {
        id:3,
        nombre:"Ignacio"
    }
];

let sueldos = [
    {
        id:1,
        sueldo:1000
    },
    {
        id:2,
        sueldo:2000
    }
];


let getEmpleadoById = (id)=>{
    return new Promise((resolve,reject)=>{
        let empleado = empleados.find(elemento=>elemento.id==id);
        if(!empleado){
            reject(`El empleado con id: ${id} no existe en la BD`);
            return;
        }else{
            resolve(empleado)
            return;
        }
    });
};

let getSueldo = (empleado)=>{
    return new Promise((resolve,reject)=>{
        let info = sueldos.find(elemento => elemento.id == empleado.id);
        if(!info){
            reject(`El id: ${empleado.id} empleado: ${empleado.nombre} no posee sueldo`);
            return;
        }else{
            let objeto = {
                id:empleado.id,
                nombre:empleado.nombre,
                sueldo:info.sueldo
            };
            resolve(objeto);
            return;
        }
    });
}

/*
getEmpleadoById(4).then(empleado=>{
    getSueldo(empleado).then(info=>{
        console.log(info);
    },error=>{
        console.log(error);
    });
},error=>{
    console.log(error);
});
*/

getEmpleadoById(4).then(empleado=>{
    return getSueldo(empleado);
}).then(res=>{
    console.log(res);
}).catch(error=>{
    console.log(error);
});