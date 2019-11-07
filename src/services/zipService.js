const getResource = require('../config/axios')
const {getWeatherByZipCodeEndpoint} = require('../config/endpoints')

/**
 * Returns Weather Details retrieved from the Open Weathermap API
 * param = zip_code
 */
exports.getWeatherByZipCode = async zip_code => {
  try{
    let response = getResource(getWeatherByZipCodeEndpoint(zip_code));
    return response.status === 200 ? response.data : () => {throw('Please Provide A Valid Postal Code')}
  }catch(error){
    console.log({error})
    throw(error)
  }
}
