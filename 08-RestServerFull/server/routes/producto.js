const express = require('express');
const app = express();
const Producto = require('../models/producto');
const _ = require('underscore');
const {verificarToken} = require('../middlewares/autenticacion');

app.get('/productos',verificarToken,(req,res)=>{
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 2;
    Producto.find({disponible:true})
    .skip(desde)
    .limit(limite)
    .populate('categoria')
    .populate('usuario')
    .sort('nombre')
    .exec((error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }
        res.json({ok:true,productos:productoDB});
    });
});

app.get('/productos/:id',verificarToken,(req,res)=>{
    let id = req.params.id;
    Producto.findOne({_id:id})
    .populate('usuario')
    .populate('categoria')
    .exec((error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        res.json({
            ok:true,
            producto:productoDB
        });
    });
});

app.get('/productos/buscar/:termino',verificarToken,(req,res)=>{
    let termino = req.params.termino;
    let reg = RegExp(termino,'i');
    Producto.find({nombre:reg},(error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        return res.json({
            ok:true,
            productos:productoDB
        });
    });
});

app.post('/productos',verificarToken,(req,res)=>{
    let body = req.body;
    let producto = new Producto({
        nombre : body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        diponible : body.disponible,
        categoria : body.categoria,
        usuario : req.usuario._id
    });
    producto.save((error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        res.json(productoDB);
    });
});

app.put('/productos/:id',verificarToken,(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    body = _.pick(body,['nombre','precio','descripcion','disponible','categoria']);
    body.usuario = req.usuario._id;
    let options = {new:true,runValidators:true,context: 'query'};
    Producto.findByIdAndUpdate(id,body,options,(error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }
        res.json({
            ok:true,
            productoDB
        });
    });
});

app.delete('/productos',verificarToken,(req,res)=>{
    let id = req.body.id;
    let options = {new:true,runValidators:true,context: 'query'};
    Producto.findByIdAndUpdate(id,{disponible:false},options,(error,productoDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        if(!productoDB.diponible){
            return res.status(400).json({
                ok:false,
                error:{mensaje:'El producto ya esta deshabilitado.'}
            });
        }
        return res.json({
            ok:true,
            mensaje:'Producto deshabilitado',
            producto:productoDB
        })
    });
});


module.exports = app;