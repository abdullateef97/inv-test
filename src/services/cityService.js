const getResource = require('../config/axios')
const {getWeatherByCityNameEndpoint} = require('../config/endpoints')

/**
 * Returns Weather Details retrieved from the Open Weathermap API
 * param = city_name
 */
exports.getWeatherByCityName = async city_name => {
  try{
    let response = getResource(getWeatherByCityNameEndpoint(city_name));
    return response.status === 200 ? response.data : () => {throw('Please Provide A Valid City Name')}
  }catch(error){
    console.log({error})
    throw(error)
  }
}
