const axios = require('axios');

let api = "AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM";

let getCoords = async(direc)=>{
    let direccion = encodeURI(direc);
    try{
        let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${api}`);
        let address = resp.data.results[0].formatted_address;
        let lat = resp.data.results[0].geometry.location.lat;
        let lng = resp.data.results[0].geometry.location.lng;
        let objeto = {
            direccion:address,
            lat:lat,
            lng:lng
        };
        return objeto;
    }catch(error){
        return {
            results:[],
            status:"ZERO RESULTS"
        };
    }
};

module.exports = {
    getCoords
}