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

module.exports = {
    verificarToken
};