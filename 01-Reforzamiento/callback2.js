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


let getUserById = (id,callback)=>{
    let usuario = empleados.find((elemento)=>{
        if(elemento.id ==id){
            return elemento;
        }
    });
    if(!usuario){
        callback(`El empleado con id ${id} no existe`);
        return;
    }
    callback(null,usuario);
    return;
};

let getSueldo = (empleado,callback)=>{
    let sueldo = sueldos.find((sueldo)=>{
        if(sueldo.id == empleado.id){
            return sueldo;
        }
    });
    if(!sueldo){
        callback(`${empleado.id} ${empleado.nombre} no posee sueldo en la BD`);
        return;
    }else{
        let sueldoEmpleado = {
            id:empleado.id,
            nombre:empleado.nombre,
            sueldo:sueldo.sueldo
        };
        callback(null,sueldoEmpleado);
    }
};


getUserById(3,(error,empleado)=>{
    if(error){
        console.log(error);
    }else{
        getSueldo(empleado,(error,empleadoInfo)=>{
            if(error){
                console.log(error);
            }else{
                console.log(empleadoInfo);
            }
        });
    }
});