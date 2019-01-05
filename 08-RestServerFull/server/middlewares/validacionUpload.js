let validarFormato = (req,res,next)=>{
    if (!req.files) {
        return res.status(400).json({
            ok:false,
            error:{mensaje:'No se pudo cargar el archivo.'}
        });
      }
    let archivo = req.files.archivo;
    let extensionesValidas = ['png','jpg','gif','jpeg'];
    let archivoSplit = archivo.name.split('.');
    let extensionArchivo = archivoSplit[archivoSplit.length-1];
    if(extensionesValidas.indexOf(extensionArchivo)<0){
        return res.status(400).json({
            ok:false,
            error:{
                mensaje:`Extension del archivo no válida`,
                permitidas:extensionesValidas.join(','),
                actual:extensionArchivo
            }
        });
    }
    next();
}

let validarTipo = (req,res,next)=>{
    let tiposValidos = ['productos','usuarios']; 
    let tipo = req.params.tipo;
    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            error:{
                mensaje:`tipo de url no válida`,
                permitidas:tiposValidos.join(','),
                actual:tipo
            }
        });
    }
    next();
}

module.exports = {
    validarFormato,
    validarTipo
}