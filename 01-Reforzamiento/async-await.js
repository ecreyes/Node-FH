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

/*
SIN ASYNC
let getUserById = (id)=>{
    return new Promise((resolve,reject)=>{

    });
}

CON ASYNC
let getUserById = async(id)=>{

}
*/

let getUserById = async(id)=>{
    let empleado = empleados.find(elemento => elemento.id==id);
    if(!empleado){
        throw new Error(`El empleado con id ${id} no existe en la BD`);
    }
    return empleado;
};

let getSueldo = async (empleado)=>{
    let info = sueldos.find(elemento => elemento.id==empleado.id);
    if(!info){
        throw new Error(`El empleado con id ${empleado.id} no posee sueldo`);
    }else{
        let objeto = {
            id: empleado.id,
            nombre: empleado.nombre,
            sueldo: info.sueldo
        };
        return objeto;
    }    
};


let getInfo = async (id)=>{
    try{
        let empleado = await getUserById(id);
        let info = await getSueldo(empleado);
        return info;
    }catch(error){
        return error;
    }
};

getInfo(3).then(info=>{
    console.log(info);
}).catch(error=>{
    console.log(error);
});