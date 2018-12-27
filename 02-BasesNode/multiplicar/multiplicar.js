const fs = require('fs');
let crearArchivo = (base)=>{
    return new Promise((resolve,reject)=>{
        let data = "";
        for(let i=1; i<=10;i++){
            data += `${base}*${i} = ${base*i}\n`;
        }
    
        fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
            if (err){
                reject("El archivo no se pudo crear");
                return;
            }
            resolve(`tabla-${base}.txt`);
            return;
        });
    });
};

let sumar = (a,b)=>a+b;

module.exports = {
    crearArchivo,
    sumar
}