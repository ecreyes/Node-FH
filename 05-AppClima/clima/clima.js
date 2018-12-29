const axios = require('axios');

let getClima = async(lat,lng)=>{
    try{
        let appid = 'f9e90ef6b13c7da7839e394c90e37378';
        let latitud = lat;
        let longitud = lng;
        let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${appid}`);
        return resp.data.main.temp; 
    }catch(error){
        throw new Error("No hay resultados");
    }  
};

module.exports = {
    getClima
}