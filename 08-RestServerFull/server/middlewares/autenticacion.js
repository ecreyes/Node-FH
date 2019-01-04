const jwt = require('jsonwebtoken');

let verificarToken = (req,res,next)=>{
    let token = req.get('token');
    jwt.verify(token, process.env.JWTSeed,(error, decoded)=> {
        if(error){
            return res.status(401).json({
                ok:false,
                error
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

let verificarAdminRole = (req,res,next)=>{
    let usuario = req.usuario;
    if(usuario.role == 'ADMIN_ROLE'){
        next();
    }else{
        return res.status(401).json({
            ok:false,
            error:{
                mensaje:"Permiso denegado."
            }
        })
    }
};

module.exports = {
    verificarToken,
    verificarAdminRole
};