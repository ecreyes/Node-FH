const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

app.post('/login',(req,res)=>{
    res.json({
        ok:'login true'
    });
});

module.exports = app;