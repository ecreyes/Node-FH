# Reforzamiento de temas en Javascript.
## Nodemon.
Nodemon es un paquete que se instala mediante npm, este permite correr el servidor con el comando `nodemon` en vez de usar `node` y de esta forma el servdor se reinicia constantemente, es necesario decir que este paquete es solo para el ambiente de desarrollo por lo cual se puede instalar con:
```javascript
npm install -g nodemon
```
o tambíen con:
```javascript
npm install -g --save nodemon
```
se recomienda instalar ambos para que uno quede indicado en las dependencias de desarrollo.

## Let vs Var.
Ambas sirven para declarar variables, pero el `let` respeta el ámbito de la variable a diferencia de `var`, siempre es recomendable usar let en vez de var, por ejemplo:
```javascript
//Ejemplo de var
var nombre = "Eduardo";
if(true){
    var nombre = "Carlos";
}
console.log("var: ",nombre);

//Ejemplo de Let
let lnombre = "Eduardo";
if(true){
    let lnombre = "Carlos";
}
console.log("let: ",lnombre);
```

## Template literales.
Permite hacer una concatenación mucho más limpia, ademas permite ejecutar código js dentro de la concatenación.
```javascript
let nombre = "Eduardo";
let texto = `Hola ${nombre}`;
let textoDos = `usando multiplicacion ${2*2}`;
console.log(texto);
console.log(textoDos);
```

## Destructuración de objetos.
Se utiliza para declarar varias variables de una sola vez, recomendable usar solamente si es para obtener datos y no funciones que muestra undefined.
```javascript
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
```
si se añade un dos puntos despues de la declaración, se renombra la variable con otro nombre.

## Funciones flecha.
Las funciones de flecha son una nueva forma de declarar funciones en javascript, la sintaxis es bastante intuitiva, el unico inconveniente es que no sirve el this dentro de las funciones de flecha cuando se utiliza en un objeto.
```javascript
//funciones normales
function sumar(a,b){
    return a+b;
}

let sumarFlecha = (a,b)=>{
    return a+b;
}

//una sola linea
function mostrar(){
    return "Hola mundo";
}
let mostrarFlecha = ()=> "Hola mundo";

//un parametros y una sola linea
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
```