const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const {verificarToken} = require('../middlewares/autenticacion');
const _ = require('underscore');

app.get('/usuarios',verificarToken,(req, res)=> {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5
    Usuario.find({estado:true},'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((error,usuarios)=>{
        if(error){
            res.status(400).json({
                ok:false,
                error
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
                error
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
                error
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
    let id = req.body.id;
    Usuario.findByIdAndUpdate(id,
        {estado:false},
        {new:true,runValidators:true,context:'query'},
        (error,usuarioDB)=>{
            if(error){
                res.status(400).json({
                    ok:false,
                    error
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

module.exports = app;
