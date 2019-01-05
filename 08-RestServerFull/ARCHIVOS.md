# Manejo de archivos en el servidor.

## Subir archivos a Express.
Lo primero que hay que hacer es instalar el `express-fileupload`:
```bash
npm install --save express-fileupload
```
En la raiz del proyecto crear una nueva carpeta que se va a llamar `uploads`, esta carpeta se encargará de contener los archivos que se suben.
En la carpeta `server/routes` crear un archivo `upload.js`, colocarlo en `routes.js` para decir que existe y colocar lo siguiente en el archivo:
```javascript
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload',(req, res)=> {
    if (!req.files) {
      return res.status(400).json({
          ok:false,
          error:{mensaje:'No se pudo cargar el archivo.'}
      });
    }
  
    // El nombre que va a tener el input, si el campo se llama `archivo` colocar .archivo en req.files
    let archivo = req.files.archivo;
  
    //mv() se usa para guardar el archivo en ese directorio.
    archivo.mv('uploads/filename.jpg',(err)=> {
        if (err){
            return res.status(500).send(err);
        }    
        res.json({
            ok:true,
            mensaje:'Archivo subido correctamente.'
        });
    });
});
module.exports = app;
```
cuando se llama el middleware `fileUpload()` hace que todos los archivos que se carguen se guarden en una variable `req.files`.
Esto se puebe probar en postman colocan el `PUT` y en el body se usa `form-data`, poner una varaible archivo y cambiarla a `file`.

## Validar la extensión del archivo.
Actualmente se podria subir cualquier tipo de archivo por lo que hay que validar.
En el curso se siguio otro ejemplo de validación en mi caso hice un middleware que se llama `validacionUpload.js` que se encarga de ver que se suba correctamente el archivo y que la extensión sea válida.

```javascript
let validarFormato = (req,res,next)=>{
    if (!req.files) {
        return res.status(400).json({
            ok:false,
            error:{mensaje:'No se pudo cargar el archivo.'}
        });
      }
    let archivo = req.files.archivo;
    let extensionesValidas = ['png','jpg','gif','jpeg'];
    let archivoSplit = archivo.name.split('.');
    let extensionArchivo = archivoSplit[archivoSplit.length-1];
    if(extensionesValidas.indexOf(extensionArchivo)<0){
        return res.status(400).json({
            ok:false,
            error:{
                mensaje:`Extension del archivo no válida`,
                permitidas:extensionesValidas.join(','),
                actual:extensionArchivo
            }
        });
    }
    next();
}

module.exports = {
    validarFormato
}
```
quedando de la siguiente forma:
```javascript
const {validarFormato} = require('../middlewares/validacionUpload');

app.put('/upload',validarFormato,(req, res)=> {
    let archivo = req.files.archivo;
    archivo.mv(`uploads/${archivo.name}`,(err)=> {
        if (err){
            return res.status(500).send(err);
        }    
        res.json({
            ok:true,
            mensaje:'Archivo subido correctamente.'
        });
    });
});
```
Ahora si todos los usuarios suben un archivo que se llama igual va a ocurrir un problema :(
## Ubicar y renombrar archivos.
Dentro de la carpeta uploads se generarán dos carpetas uno de `usuarios` y otro de `productos` para almacenar las imagenes.
Se genera otra función para validar el tipo en la ruta:
```javascript
let validarTipo = (req,res,next)=>{
    let tiposValidos = ['productos','usuarios']; 
    let tipo = req.params.tipo;
    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            error:{
                mensaje:`tipo de url no válida`,
                permitidas:tiposValidos.join(','),
                actual:tipo
            }
        });
    }
    next();
}
```
luego se cambia el nombre del archivo y la ubicación:
```javascript
app.put('/upload/:tipo/:id',[validarFormato,validarTipo],(req, res)=> {
    let tipo = req.params.tipo;
    let id = req.params.id;
    let archivo = req.files.archivo;
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${archivo.name}`;
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`,(err)=> {
        if (err){
            return res.status(500).send(err);
        }    
        res.json({
            ok:true,
            mensaje:'Archivo subido correctamente.'
        });
    });
});
```

## Actualizar el archivo subido al modelo, es decir asignarla a un usuario.
Se genera una función aparte para cuando se intente insertar pasando parametros por referencia y se crea una función para borrar imagenes que ya no se estan utilizando, el código completo a continuacion:
```javascript
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const {validarFormato,validarTipo} = require('../middlewares/validacionUpload');
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id',[validarFormato,validarTipo],(req, res)=> {
    let tipo = req.params.tipo;
    let id = req.params.id;
    let archivo = req.files.archivo;
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${archivo.name}`;
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`,(err)=> {
        if (err){
            return res.status(500).json({
                ok:false,
                error
            });
        }
        if(tipo=='usuarios'){
            imagenUsuario(id,res,nombreArchivo);
        }
        if(tipo=='productos'){
            console.log('productos xD');
        }    
    });
});

let imagenUsuario = (id,res,nombreArchivo)=>{
    Usuario.findById(id,(error,usuarioDB)=>{
        if(error){
            borrarArchivo(nombreArchivo,'usuarios');
            return res.status(500).json({
                ok:false,
                error
            });
        }
        if(!usuarioDB){
            borrarArchivo(nombreArchivo,'usuarios');
            return res.status(400).json({
                ok:false,
                error:{mensaje:'El usuario no existe.'}
            });
        }
        borrarArchivo(usuarioDB.img,'usuarios');
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((error,usuarioDB)=>{
            if(error){
                borrarArchivo(nombreArchivo,'usuarios');
                return res.status(400).json({
                    ok:false,
                    error
                });
            }
            res.json({
                ok:true,
                usuario:usuarioDB,
                img:nombreArchivo
            })
        });
    });

}

let borrarArchivo = (nombreArchivo,tipo)=>{
    let pathUrl = path.resolve(__dirname,`../../uploads/${tipo}/${nombreArchivo}`);
    if(fs.existsSync(pathUrl)){
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;
```