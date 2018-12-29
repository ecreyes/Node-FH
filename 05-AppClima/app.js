const {getCoords} = require('./lugar/lugar');
const {getClima} = require('./clima/clima');
const argv = require('yargs')
    .options({
        direccion:{
            alias:'d',
            demand:true,
            desc:'Dirección de la ciudad para obtener el clima'
        }
    })
    .argv;

let getInfo = async (direccion) =>{
    let objeto = await getCoords(direccion);
    let temperatura = await getClima(objeto.lat,objeto.lng);
    return `La temperatura en ${objeto.direccion} es de: ${temperatura}`;
};

getInfo(argv.direccion).then(resp=>{
    console.log(resp);
}).catch(error =>{
    console.log(error);
});