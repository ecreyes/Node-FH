const express = require('express');
const app = express(); 

const port = process.env.PORT || 5000;

app.use(express.static(__dirname+'/public'));
console.log(__dirname);
app.get('/usuarios',(req, res)=> {
  let users = [{
    id:1,
    nombre:"Eduardo"
  },{
    id:2,
    nombre:"Carlos"
  },{
    id:3,
    nombre:"Ignacio"
  }];
  res.send(users);
});
 
app.listen(port,()=>{
    console.log(`Server ON puerto ${port}`);
});