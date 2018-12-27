let saiyan = {
    nombre: "Vegeta",
    poder: "Final Flash",
    getInfo: function(){
        return `El nombre es: ${this.nombre}, poder: ${this.poder}`;
    }
};
/*
let nombre = saiyan.nombre;
let poder = saiyan.poder;
let info = saiyan.getInfo();
console.log(nombre);
console.log(poder);
console.log(info);
*/

//Utilizando destructuracion
let {nombre,poder:podersito,getInfo} = saiyan;
console.log(nombre);
console.log(podersito);
console.log(getInfo());