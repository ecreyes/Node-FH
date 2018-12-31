require ('./config/config');
const express = require('express');
const app = express();
//BodyParser para obtener body de post
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
 
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
 
app.listen(process.env.PORT,()=>{
    console.log(`Server ON PORT ${process.env.PORT}`);
});