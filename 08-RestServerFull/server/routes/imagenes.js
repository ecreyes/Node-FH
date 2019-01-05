const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/imagen/:tipo/:img',(req,res)=>{
    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathUrl = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);
    if(fs.existsSync(pathUrl)){
        res.sendFile(pathUrl);
    }else{
        let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});


module.exports = app;