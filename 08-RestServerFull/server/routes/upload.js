const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const {validarFormato,validarTipo} = require('../middlewares/validacionUpload');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
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
            imagenProducto(id,res,nombreArchivo);
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

let imagenProducto = (id,res,nombreArchivo)=>{
    Producto.findById(id,(error,productoDB)=>{
        if(error){
            borrarArchivo(nombreArchivo,'productos');
            return res.status(500).json({
                ok:false,
                error
            });
        }
        if(!productoDB){
            borrarArchivo(nombreArchivo,'productos');
            return res.status(400).json({
                ok:false,
                error:{mensaje:'El producto no existe.'}
            });
        }
        borrarArchivo(productoDB.img,'productos');
        productoDB.img = nombreArchivo;
        productoDB.save((error,productoDB)=>{
            if(error){
                borrarArchivo(nombreArchivo,'productos');
                return res.status(400).json({
                    ok:false,
                    error
                });
            }
            res.json({
                ok:true,
                producto:productoDB,
                img:productoDB.img
            });
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