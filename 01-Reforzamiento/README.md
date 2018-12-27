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

## Callbacks.
Los callbacks son funciones que se pasan como parámetros a otras funciones, generalmente al callback se le pasan dos parametros (error,respuesta), a continuación un ejemplo:
```javascript
let getUsuarioById = (id,callback)=>{
    let usuario = {
        id:id,
        nombre:"Eduardo"
    };
    if(id==20){
        callback(`El usuario con id ${20} no existe`);
        return;
    }
    callback(null,usuario);
    return;
};

getUsuarioById(1,(error,user)=>{
    if(error) console.log(error);
    else{
        console.log(user);
    }
})
```
la función `getUsuarioById` resive dos parametros, el primero un id y el segundo una función, dentro del getUsuarioById este va a ejecutar el callback que se pasó como parámetro y ese va a devolver uno o dos parametros, uno si es un error dos si funcionó correctamente.

## Promesas.
Las promesas son similares a los callbacks, permiten hacer trabajos sincronos o asincronos y luego hacer algo en especifico.
Por ejemplo:
```javascript
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

getEmpleadoById(2).then(empleado=>{
    console.log(empleado);
},error=>{
    console.log(error);
})
```
Primero se crea una función comun y corriente, luego dentro se hace un `return new Promise()`, dentro de la promesa que se retorna se debe hacer un resolve y reject, resolve es cuando se logra exitosamente algo y reject cuando ocurre un error, luego para recibir los datos se utiliza un `.then` con dos funciones callback una para el resolve  y otra para el reject.
`Nota:` El `let empleado = empleados.find(elemento=>elemento.id==id);` siempre va a devolver un objeto `elemento` como se declaro anteriormente, es decir si la condicion de la derecha se cumple retornará el objeto ya que el find hace que recorra todos los objetos, ya se intente haciendo que solo retornara un valor especifico del objeto y siempre devuelve el objeto completo.

Ahora si se quisiera concatenar valores obtenidos a partir de promesas:
```javascript
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

getEmpleadoById(4).then(empleado=>{
    getSueldo(empleado).then(info=>{
        console.log(info);
    },error=>{
        console.log(error);
    });
},error=>{
    console.log(error);
})
```
Como se puede apreciar se repite el código de error y esto se iría corriendo hacia la derecha por lo cual se puede mejorar usando un `then` y `catch`.
```javascript
getEmpleadoById(4).then(empleado=>{
    return getSueldo(empleado);
}).then(res=>{
    console.log(res);
}).catch(error=>{
    console.log(error);
});
```

## Async y await.
El async y el await es similar a trabajar con promessas de hecho se puede usar el await para esperar el resultado de una promesa pero siempre cumpliendo la condicion de que la funcion que usa el await tenga el async.
La sintaxis es la siguiente:
```javascript
//SIN ASYNC
let getUserById = (id)=>{
    return new Promise((resolve,reject)=>{

    });
}

//CON ASYNC
let getUserById = async(id)=>{

}
```
Ahora cambiando el código anterior:
```javascript
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
```