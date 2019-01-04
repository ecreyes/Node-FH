const express = require('express');
const app = express();
const Categoria = require('../models/categoria');
const {verificarToken,verificarAdminRole} = require('../middlewares/autenticacion');


app.get('/categorias',verificarToken,(req,res)=>{
    Categoria.find({})
    .sort('nombre')
    .populate('usuario','nombre email')
    .exec((error,categoriasDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }else{
            res.json(categoriasDB);
        }
    });
});

app.get('/categorias/:id',verificarToken,(req,res)=>{
    let idCategoria = req.params.id;
    Categoria.findOne({_id:idCategoria}).exec((error,categoriaDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        res.json(categoriaDB);
    });
});

app.post('/categorias',[verificarToken,verificarAdminRole],(req,res)=>{
    let body = req.body;
    let categoria = new Categoria();
    categoria.nombre = body.nombre;
    categoria.usuario = req.usuario._id;
    categoria.save((error,categoriaDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        res.json(categoriaDB);
    });
});

app.put('/categorias/:id',[verificarToken,verificarAdminRole],(req,res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let options = {new:true,runValidators:true,context: 'query'};
    Categoria.findByIdAndUpdate(id,{nombre},options,(error,categoriaDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }else{
            res.json({categoriaDB});
        }
    });
});

app.delete('/categorias',[verificarToken,verificarAdminRole],(req,res)=>{
    let id = req.body.id;
    Categoria.findByIdAndDelete(id,(error,categoriaBorrada)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            });
        }
        if(!categoriaBorrada){
            return res.status(400).json({
                ok:false,
                error:{mensaje:'Categoria no existe.'}
            });
        }
        res.json(categoriaBorrada);
    });

});
module.exports = app;