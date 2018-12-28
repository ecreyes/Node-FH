const fs = require('fs');
let crearArchivo = (base,limite)=>{
    return new Promise((resolve,reject)=>{
        let data = "";
        for(let i=1; i<=limite;i++){
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

let listarArchivo = (base,limite)=>{
    return new Promise((resolve,reject)=>{
        if(!Number(base) || !Number(limite)){
            reject("Parámetro no válido");
            return;
        }
        let data = "";
        for(let i=1;i<=limite;i++){
            data += `${base}*${i} = ${base*i}\n`;
        }
        resolve(data);
    });
}

module.exports = {
    crearArchivo,
    listarArchivo
}