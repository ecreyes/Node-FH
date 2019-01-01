const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore');

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

app.delete('/usuarios',(req,res)=>{
    res.json('delete usuarios');
});

module.exports = app;
