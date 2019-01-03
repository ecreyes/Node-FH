require ('./config/config');
const express = require('express');
const app = express();

//BodyParser para obtener body de post
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Rutas
app.use(require('./routes/routes'));
// BD
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/cafe',
    {useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false}
    ,(err,res)=>{
    if(err) throw err;
    console.log("Conexión BD ON");
});
 
app.listen(process.env.PORT,()=>{
    console.log(`Server ON PORT ${process.env.PORT}`);
});