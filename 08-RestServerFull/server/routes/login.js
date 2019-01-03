const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

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
        let token = jwt.sign({
            usuario: usuarioDB
          }, process.env.JWTSeed, { expiresIn: process.env.JWTExpire });
        return res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });
    });
});

module.exports = app;