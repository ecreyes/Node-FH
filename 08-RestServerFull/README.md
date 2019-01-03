# Rest Server.

## Instalaciones previas (Windows).
### MongoDB
Se utilizará MongoDB para la base de datos, por lo cual hay que ir a la página oficial de MongoDB y buscar el instalador. Una vez descargado colocar siguiente en el instalador y al finalizar se debe crear una carpeta `data` y `db` que debe quedar de la siguiente forma `C:\data\db`.
Ahora para encender la base de datos hay que ir a `C:\Program Files\MongoDB\Server\4.0\bin` y ejecutar el `mongod` por consola, se recomienda añadir esa ruta al path para ejecutar el `mongod` desde cualquier lugar.
### Robo 3T.
Para manejar la base de datos se utilizará Robo3T, hay que ir a la página oficial y descargar la versión gratuita.
Una vez instalado y con la base de datos corriendo,en `MongoDB connections` hacer click en `create`, se colocan los siguientes campos:
* name:Nombre de la conexión
* address: localhost
* port: 27017 (este se ve en mongod en la terminal)
Luego dar ok y se puede conectar a la base de datos.

## Peticiones HTTP.
Las peticiones http son utilizadas para comunicarse con el servidor, en este server se utilizaran:
* get (obtener datos)
* post (guardar un dato)
* put (actualizar un dato)
* delete (borrar un dato)

Para realizar estas peticiones se utilizará express y se generan de la siguiente forma:
```javascript
const express = require('express');
const app = express();
 
app.get('/usuario',(req, res)=> {
    res.json("get usuario");
});

app.post('/usuario',(req, res)=> {
    res.json("post usuario");
});

app.put('/usuario/:id',(req, res)=> {
    let id = req.params.id;
    res.json({
        id:id
    });
});

app.delete('/usuario',(req, res)=> {
    res.json("delete usuario");
});
 
app.listen(3000,()=>{
    console.log("Server ON puerto 3000");
});
```
La respuesta que se va a enviar es en formato json por eso es el `res.json`.

### Recibir parametros por url.
Si se quieren recibir parametros por url se debe indicar el parámetro en la direccion con un dos puntos, por ejemplo:
```javascript
app.put('/usuario/:id',(req, res)=> {
    let id = req.params.id;
    res.json({
        id:id
    });
});
```
ahi esa dirección espera recibir un parametro id y este se puede recibir con `req.params.id`, notese que si el parametro tiene otro nombre por ejemplo `x` se tendria que colocar en la dirección `:x` y se recibiria con `req.params.x`, todos los parametros recibidos se pueden mostrar con un `console.log(req.params)`

### Recibir parámetros por el body.
En la petición post se puede enviar mucha información, por ejemplo hay que ir a POSTMAN seleccionar POST, luego ir a la sección `BODY` y seleccionar `x-www-form-urlencoded`, ahi aparecen el key y value en los cuales se puede ingresar los campos con los valores que se desea enviar.
Para recibir estos parámetros en el servidor es necesario instalar el paquete `body parser`:
```javascript
npm install body-parser --save
```
luego en el archivo del server colocar:
```javascript
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
```
ahora simplemente para recibir los datos se puede hacer un `req.body` que trae todos los datos que fueron enviados, se le puede hacer un `console.log(req.body)` para ver los datos o una asignacion:
```javascript
let body = req.body;
```

## Enviar códigos de respuesta http.
Se pueden enviar códigos como el 400, 404 etc, para esto se utiliza lo siguiente, en la funcion que maneja la url
en el `res` usar:
```javascript
app.post('/usuario',(req, res)=> {
    let body = req.body;
    if(!body.nombre){
        res.status(400).json({
            ok:false,
            mensaje:"Falta el campo nombre"
        });
    }else{
        res.json(req.body);
    }
});
```
## Creando un archivo de configuración global.
Este archivo tendra toda la configuración de la aplicación es decir puertos, conexiones a bases de datos, heroku etc. Para lograr esto hay que crear una carpeta config dentro del server y un archivo config respectivo.
El archivo contiene lo siguiente:
```javascript
// ===================
//   Puerto
// ===================
process.env.PORT = process.env.PORT || 3000;
```
Ahora hay que hacer un require de este archivo y dejarlo en la primera linea del codigo del servidor para que cargue
todas estas variables globales.
Ejemplo:
```javascript
require('./config/config');
```
Ahora se puede cambiar el puerto con:
```javascript
app.listen(process.env.PORT,()=>{
    console.log(`Server ON puerto ${process.env.PORT}`);
});
```

## Conectar server a base de datos con Moongose.
Se conectará el servidor a MongoDB utilizando `moongose` que es un paquete que permite hacer este proceso,
se instala de la siguiente forma:
```javascript
npm install mongoose --save
```
Este paquete permite manejar toda la base de datos creando modelos, consultas etc, por lo que es recomendable ir al sitio oficial de moongose y ver la documentación.

Luego hacer el require en el archivo del server:
```javascript
const mongoose = require('mongoose');
```
Ahora antes del app.listen del servidor colocar:
```javascript
mongoose.connect('mongodb://localhost:port/my_database',{useNewUrlParser: true},callback);
```
* localhost: dirección donde se encuentra la base de datos.
* port: puerto de la base de datos
* my_database: nombre de la base de datos.
* {useNewUrlParser: true}: es un objeto json con configuraciones, se pueden añadir más opciones dentro del json.
* callback : error o conexión exitosa

quedaria de la siguiente forma:
```javascript
mongoose.connect('mongodb://localhost:27017/cafe',{useNewUrlParser: true},(err,res)=>{
    if(err) throw err;
    console.log("Conexión realizada correctamente");
});
 
app.listen(process.env.PORT,()=>{
    console.log(`Server ON PORT ${process.env.PORT}`);
});
```
No es necesario que la base de datos se cree anteriormente, esta se creara cuando se realize alguna inserción.

## Ordenar rutas.
Para ordenar las rutas es bastante simple, en la carpeta server crear una nueva carpeta llamada `routes`,dentro de esa carpeta crear un archivo `usuario.js` porque contendra las rutas de usuario, bueno se copian todas las rutas que son:
```javascript
app.get('/usuarios',(req, res)=> {
    let usuarios = [{
        id:1,
        nombre:"Eduardo"
    },{
        id:2,
        nombre:"Carlos"
    },{
        id:3,
        nombre:"Ignacio"
    }];
    res.json(usuarios);
});

app.post('/usuarios',(req,res)=>{
    let body = req.body;
    if(!body.nombre){
        res.status(400).json({
            ok:false,
            mensaje:'falta enviar el nombre'
        });
    }else{
        let objeto = {
            id:body.id,
            nombre:body.nombre
        };
        res.json(objeto);
    }
});

app.put('/usuarios/:id',(req,res)=>{
    let id = req.params.id;
    let objeto = {
        id:id,
        mensaje:"recibido correctamente"
    }
    res.json(objeto);
});

app.delete('/usuarios',(req,res)=>{
    res.json('delete usuarios');
});
```
ahora para que esto funcione se tiene que declarar el app y exportarlo quedando asi:
```javascript
const express = require('express');
const app = express();

app.get('/usuarios',(req, res)=> {
    let usuarios = [{
        id:1,
        nombre:"Eduardo"
    },{
        id:2,
        nombre:"Carlos"
    },{
        id:3,
        nombre:"Ignacio"
    }];
    res.json(usuarios);
});

app.post('/usuarios',(req,res)=>{
    let body = req.body;
    if(!body.nombre){
        res.status(400).json({
            ok:false,
            mensaje:'falta enviar el nombre'
        });
    }else{
        let objeto = {
            id:body.id,
            nombre:body.nombre
        };
        res.json(objeto);
    }
});

app.put('/usuarios/:id',(req,res)=>{
    let id = req.params.id;
    let objeto = {
        id:id,
        mensaje:"recibido correctamente"
    }
    res.json(objeto);
});

app.delete('/usuarios',(req,res)=>{
    res.json('delete usuarios');
});

module.exports = app;
```
Ahora en el archivo del servidor colocar `app.use(require('./routes/usuario'));`.

## Modelos.
Para usar modelos primero hay que crear una carpeta `models` dentro de server, en este ejemplo se creará el modelo de usuario, por lo cual se crea el archivo `usuario.js` dentro de models.
En el archivo se empieza cargando moongose:
```javascript
const mongoose = require('mongoose');
```
Ahora se genera la variable del schema y la variable que generará el schema:
```javascript
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({

});
```
Dentro del new Schema() se declara un json donde será del tipo:
```javascript
campo:{
    opcionesJson...
},
campo2:{
    opcionesJson...
}
```
Finalmente queda de la siguente forma:
```javascript
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        required:[true,'El correo es necesario']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        default:'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Usuario',usuarioSchema);
```
* required: Los required puede ser simplemente `required:true` pero si aparece algun error saldria en ingles, por eso el corchetes con el mensaje.
* type: tipo de dato que se admite
* default: valor por default al crear un objeto si no se ingresa el valor.

Finalmente para crear el modelo se utiliza:
```javascript
mongoose.model('Usuario',usuarioSchema);
```
que inidica el nombre del modelo, en este caso se va a llamar `Usuario` y va a tener toda la configuración de la variable `usuarioSchema`.

Para ver si este modelo funciona correctamente se hace lo siguiente:
En postman verificar que la ruta post esta funcionando correctamente cuando se envian parámetros.
En `routes/usuario` se importa el modelo:
```javascript
const Usuario = require('../models/usuario');
```
y en la ruta de post se hace lo siguiente:
```javascript
let body = req.body;
let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role
});
```
se crea una instancia del modelo con los campos y los valores que se reciben, finalmente queda de la siguiente forma:
```javascript
app.post('/usuarios',(req,res)=>{
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });
    usuario.save((error,usuarioDB)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                persona:usuarioDB
            });
        }
    });
});
```
El `usuario.save(callback)` guarda la instancia y el callback recibe dos parametros uno en caso de que no se pueda guardar generando un error, y el segundo una respuesta al guardar correctamente que en este caso son todos los datos del archivo creado.
Hay que destacar que esto no tiene validaciones y se pueden repetir valores por lo que se tiene que mejorar.
## Validaciones personalizadas email y role.
Para validar un campo como único hay que colocar lo siguiente en el modelo:
```javascript
    email:{
        type:String,
        unique:true,
        required:[true,'El correo es necesario']
    },
```
hay que agregar el campo `unique:true`, además en el servidor hay que agregar la siguiente opción para eliminar un warning:
```javascript
mongoose.connect('mongodb://localhost:27017/cafe',
    {useNewUrlParser: true,
    useCreateIndex: true}
    ,(err,res)=>{
    if(err) throw err;
    console.log("Conexión BD ON");
});
```
Para personalizar mensajes de error de las validaciones se utilizará el paquete `mongoose-unique-validator`:
```javascript
npm install --save mongoose-unique-validator
```
En el modelo del usuario donde esta declarado el `unique` se importa lo siguiente:
```javascript
const uniqueValidator = require('mongoose-unique-validator');
```
al terminar colocar:
```javascript
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único'});
```
esto significa que ese esquema va a utilizar el plugin unique validator y ademas tendra un campo de mensaje con el campo que entrará en conflico y será remplazado por {PATH} y saldrá que debe ser único.

Ahora supongamos que se quiere añadir un valor en el campo `role`, que este puede tomar solo dos valores `USER_ROLE` o `ADMIN_ROLE`, actualmente puede tomar cualquier valor y solo queremos que tome dos valores posibles.
Para solucionar esto se hace lo siguiente:
```javascript
let rolesValidos = {
    values: ['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido.'
};
```
se crea un objeto que va a ser asignado a un enum en roles, el `{VALUES}` toma el valor de lo que ingresa el usuario y servirá para decir que no es válido.
ahora se agrega el enum:
```javascript
role:{
    type:String,
    default:'USER_ROLE',
    enum:rolesValidos
},
```
Finalmente el archivo queda así:
```javascript
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido.'
};

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El correo es necesario']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único'});
module.exports = mongoose.model('Usuario',usuarioSchema);
```
## Encriptación de contraseñas.
La encriptación se realizará con el paquete de bcrypt,este se instala con:
```javascript
npm install bcrypt --save
```
Luego se importa en el archivo que contenga las contraseñas a encriptar,en este caso en `routes/usuario.js` ya que ese archivo recibe la contraseña del usuario por post:
```javascript
const bcrypt = require('bcrypt');
```
La encriptación queda de la siguiente forma:
```javascript
let body = req.body;
let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
});
```
Se utilizá `bcrypt.hashSync(body.password, 10),` donde recibe el password en texto plano y el número de salt para generar el password encriptado, mientras mas alto el número mayor nivel de encriptación.

Ahora si vemos la función completa queda:
```javascript
app.post('/usuarios',(req,res)=>{
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((error,usuarioDB)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                persona:usuarioDB
            });
        }
    });
});
```
si se inserta correctamente devuelve el objeto completo y este viene con la contraseña encriptada, lo que interesa ahora es no mostrar ese campo por temas de seguridad.
Se hace de la siguiente forma, ir al modelo correspondiente, en este caso el de usuario  y colocar:
```javascript
usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
```
Esto obtendra el json del usuario en su momento,lo pasa como objeto y elimina el campo password. El método toJSON se ejectuara cuando el objeto se envie como respuesta json.

## Actualizar información del usuario.
La actualización de datos se hace en las peticiones `put`, esto se hace de la siguiente forma:
```javascript
app.put('/usuarios/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    Usuario.findByIdAndUpdate(id,body,{new:true},(error,usuarioDB)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                usuario:usuarioDB
            })
        }

    });
});
```
se captura el id de la url y el body para saber cual dato actualizar y con que elementos,luego se ocupa el modelo de Usuario ya que el modelo maneja las consultas, se utiliza findByIdAndUpdate este puede recibir multiples parámetros y algunos pueden ser opcionales (mayor detalle en documentacion):
* parametro1 : id del objeto
* parametro2 : datos nuevos u objeto nuevo con los datos actualizar.
* parametro3 : objeto de opciones (mayor detalle en documentación), el new va a permitir que al finalizar la consulta se retorne el objeto actualizado.
* parametro4: callback con el error y la respuesta.
Si hay error se devuelve el error, si se actualiza correctamente se devuelve el usuario actualizado.

`PROBLEMA`: NO HAY VALIDACIONES AL HACER ESTO AÚN, ES DECIR SE PUEDE ACTUALIZAR CUALQUIER COSA.
si aparece algun error de deprecación se puede colocar esta opción en el mongoose.connect `useFindAndModify: false`

## Validaciones.
La validación más facil que se puede hacer es permitir solo los campos del modelo, esto se hace con:
```javascript
runValidators:true
```
se agrega en las opciones del parametro3 donde antes estaba el `new:true`. Esto ahora permitirá modificar solo campos válidos que permite el modelo, por ejemplo ahora ya no se puede actualizar un correo en uso, o agregar un rol que no esta dentro de las opciones válidas. El problema de esto es que aún puede modificar campos del modelo como por ejemplo el password ya que esta permitido.

Para quitar los campos que no se desean actualizar se utilizará un paquete llamado `Underscore` que trae un kit de herramientas para javascript con métodos ya creados para manipular variables, esta libreria tambien puede ser remplazada por `lodash`.

La libreria se instala con :
```javascript
npm install underscore --save
```
Se utiliza con:
```javascript
const _ = require('underscore');
```
En este ejemplo se utilizará el método pick que trae la libreria para solamente tomar los campos que se necesitan del objeto, es decir los campos que si se pueden actualizar, quedando de la siguiente forma:
```javascript
app.put('/usuarios/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    body = _.pick(body,['nombre','email','img','estado','role']);
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true,context: 'query'},(error,usuarioDB)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                usuario:usuarioDB
            })
        }

    });
});
```
El `context:'query'` se añade para que permita actualizar el correo ya que la validación del modelo no permitia actualizarlo.

## Obtener todos los usuarios de forma páginada.
Si se desea obtener un listado de datos de forma sencilla, se logra de este modo:
```javascript
app.get('/usuarios',(req, res)=> {
    Usuario.find({}).exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                usuarios:usuarios
            });
        }
    });
});
```
Se utilza el modelo de Usuario, en este se aplica el método find que dentro puede tener algun tipo de filtro, pero como no tiene nada recupera todo, y exec para ejecutar la consulta, se pasa un callback con el error y la respuesta.
* Si se utiliza el `.limit(5)` este solo devolverá solo 5 registros, si no se especifica de donde empezar serán los primeros 5.
* Si se utiliza `.skip(5)` esto hará que se salten los primeros 5 registros al realizar la consulta.

Se pueden recibir parámetros opcionales de las url utilizando `req.query.algo` por ejemplo si en la url ingresan:
`localhost:3000/usuarios?desde=8` se tendria que recibir con `req.query.desde`, los parámetros opcionales siempre se ingresan con el `?`, queda de la siguiente forma:
```javascript
app.get('/usuarios',(req, res)=> {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5
    Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            res.json({
                ok:true,
                usuarios:usuarios
            });
        }
    });
});
```

## Retornar número total de registros.
Para retornar el número total de documentos o de elementos de esa "tabla" se usa lo siguiente:
```javascript
app.get('/usuarios',(req, res)=> {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5
    Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            Usuario.countDocuments({},(error,total)=>{
                res.json({
                    ok:true,
                    total_usuarios:total,
                    usuarios:usuarios
                });
            });
        }
    });
});
```
Se utiliza el `Usuario.countDocuments({},callback)` esto contará todos los elementos, tambien se podrian añadir opciones al realizar la búsqueda.
Recordar que se puede filtrar dentro de ese {} usando por ejemplo:
* {nombre:'test1'}
* {google:true}

## Filtrando campos en la respuesta de un find.
Por ejemplo si solo se desean obtener ciertos campos al realizar la consulta se usa lo siguiente:
```javascript

app.get('/usuarios',(req, res)=> {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5
    Usuario.find({},'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            Usuario.countDocuments({},(error,total)=>{
                res.json({
                    ok:true,
                    total_usuarios:total,
                    usuarios:usuarios
                });
            });
        }
    });
});
```
En un string se colocan los campos respectivos.

## Borrando un usuario de la BD - FISICO.
Con el siguiente codigo se recibe un parametro id por el body, si lo encuentra borra el dato directamente de la BD y se pierde para siempre.
```javascript
app.delete('/usuarios',(req,res)=>{
    let id = req.body.id;
    Usuario.findByIdAndDelete(id,(error,usuarioBorrado)=>{
        if(error || !usuarioBorrado){
            res.status(400).json({
                ok:false,
                mensaje: error || 'El usuario no existe'
            });
        }else{
            res.json({
                ok:true,
                usuario:usuarioBorrado
            });
        }
    });
});
```
## Borrado lógico.
Solo se tiene que actualizar el estado haciendo un update y mostrando en el get solamente los de estado:true, aqui el código:
```javascript
app.get('/usuarios',(req, res)=> {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5
    Usuario.find({estado:true},'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                mensaje:error
            });
        }else{
            Usuario.countDocuments({estado:true},(error,total)=>{
                res.json({
                    ok:true,
                    total_usuarios:total,
                    usuarios:usuarios
                });
            });
        }
    });
});

app.delete('/usuarios',(req,res)=>{
    let id = req.body.id;
    Usuario.findByIdAndUpdate(id,
        {estado:false},
        {new:true,runValidators:true,context:'query'},
        (error,usuarioDB)=>{
            if(error){
                res.status(400).json({
                    ok:false,
                    mensaje:error
                });
            }else{
                res.json({
                    ok:true,
                    usuario:usuarioDB
                })
            }
        }
    );
});
```

## Ordenando las rutas del servidor.
Para mantener todas las rutas en un solo lugar se debe crear un archivo `routes.js` dentro de la carpeta routes,luego este debe contener todas las rutas de los archivos por ejemplo:
```javascript
const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;
```
En el ejemplo anterior como habian dos archivos con las rutas, estas se importaron en ese archivo en vez de colocarlo directamente en el servidor, ahora el archivo del server queda:
```javascript
app.use(require('./routes/routes'));
```

## Login de usuario.
Para iniciar sesion se debe crear un archivo `login.js` con las importaciones respectivas, luego recuperar el usuario de la base de datos ver si existe y comparar la contraseña:
```javascript
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

app.post('/login',(req,res)=>{
    let body = req.body;
    Usuario.findOne({email:body.email},(error,usuarioDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                error:{
                    mensaje:'(Usuario) o contraseña incorrectos.'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                error:{
                    mensaje:'Usuario o (contraseña) incorrectos.'
                }
            });
        }
        return res.json({
            ok:true,
            usuario:usuarioDB,
            token:'token'
        });
    });
});

module.exports = app;
```
Tambien se debe enviar el token que se generará ahora.
## JSON WEB TOKEN (JWT)
Se instala con:
```javasccript
npm install jsonwebtoken --save
```

Para generar el payload y la fecha de expiración se coloca:
```javascript
let token = jwt.sign({
    usuario: usuarioDB
    }, process.env.JWTSeed, { expiresIn: process.env.JWTExpire });
```
en las variables de configuración esta:
```javascript
process.env.JWTExpire = process.env.JWTExpire || 60 * 60 * 24 * 30;
process.env.JWTSeed = process.env.JWTSeed ||'seed-development';
```
Seria `60[s] * 60[min]* 24[h] * 30 [dias]`, va a demorar 30 dias.

## Middlewares.
En la carpeta server se debe crear una nueva carpeta llamada `middlewares`, dentro de esta carpeta se generará un archivo para la autenticación quedando `autenticacion.js`:
```javascript
let verificarToken = (req,res,next)=>{

};

module.exports = {
    verificarToken
}
```
Ahora ¿que es el middleware?, el middleware es una función que se encargará de de permitir o rechazar algun tipo de petición, es decir se coloca como un intermediario que decide algo o no. Este se utiliza de la siguiente forma por ejemplo:
```javascript
app.get('ruta',nombreMiddleware,callback){

};
```
el get tambien podria ser post o cualquier tipo de petición, de esa forma se indica que ese middleware se encargara de permitir o rechazar algun tipo de acceso a esa petición.
Ahora el middleware posee un tercer parametro el `next`, la única forma de que el middleware permita el acceso y se pueda ejecutar el callback de la peticion es ejecutando la función `next`, si esta nunca se llama no se ejecutara el callback es decir se negará la peticion.

El primer middlware se usara para validar los tokens de sesión, estos tokens no se enviarán ni por body ni por url, se enviarán en la sección `Headers` del postman, las variables se ingresan igual como si se enviaran por body.

Ahora como se recibe el token desde un header?, de la siguiente forma:
```javascript
let token = req.get('token');
```
obviamente el campo que se debio ingresar en postman sería `token` si fuese otra cosa se usa el get pero con el nombre del parámetro nuevo.
Ahora hay que verificar que el token es el correcto quedando de la siguiente forma:
```javascript
const jwt = require('jsonwebtoken');

let verificarToken = (req,res,next)=>{
    let token = req.get('token');
    jwt.verify(token, process.env.JWTSeed,(error, decoded)=> {
        if(error){
            return res.status(401).json({
                ok:false,
                error
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificarToken
};
```
Se recibe el token por el header luego se verifica si este es correcto, si esta correcto se obtiene toda la informacion en el `decoded`, se pueder hacer un console.log para ver que contiene, es lo mismo que se ve en jwt.io, entonces se guarda en el `req.usuario` el payload de usuario y se llama el next porque el token es valido y puede continuar con la consulta.

Nota: una vez iniciado el login el token debe ser guardardo en el localstorage, esto es tarea del frontend