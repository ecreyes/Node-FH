
let getUsuarioById = (id,callback)=>{
    let usuario = {
        id:id,
        nombre:"Eduardo"
    };
    if(id==20){
        callback(`El usuario con id ${20} no existe`);
        return;
    }
    callback(null,usuario);
    return;
};

getUsuarioById(1,(error,user)=>{
    if(error) console.log(error);
    else{
        console.log(user);
    }
})