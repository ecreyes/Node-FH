function sumar(a,b){
    return a+b;
}

let sumarFlecha = (a,b)=>{
    return a+b;
}


function mostrar(){
    return "Hola mundo";
}
let mostrarFlecha = ()=> "Hola mundo";


function mostrarNombre(nombre){
    return `Hola ${nombre}`;
}
let mostrarNombreFlecha = (nombre)=> `Hola ${nombre}`;


//Diferencia función y función de flecha en objeto
let miObjeto = {
    nombre: "Eduardo",
    getNombre: function(){
        return this.nombre;
    }
};

let miObjetoFlecha = {
    nombre:"Eduardo",
    getNombre: ()=>{
        return this.nombre;
    }
}
