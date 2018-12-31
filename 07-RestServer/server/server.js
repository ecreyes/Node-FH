require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
 
app.get('/usuario',(req, res)=> {
    res.json("get usuario");
});

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

app.put('/usuario/:id',(req, res)=> {
    let id = req.params.id;
    res.json({
        id:id
    });
});

app.delete('/usuario',(req, res)=> {
    res.json("delete usuario");
});
 
app.listen(process.env.PORT,()=>{
    console.log(`Server ON puerto ${process.env.PORT}`);
});