const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

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
