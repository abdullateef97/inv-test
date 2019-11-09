const getResource = require('../config/axios')
const {getWeatherByCityNameEndpoint} = require('../config/endpoints')

exports.getWeatherByCityName = async city_name => {
  try{
    let response = await getResource(getWeatherByCityNameEndpoint(city_name));
    console.log({'weather response': response})
    return response.status === 200 ? response.data : () => {throw('Please Provide A Valid City Name')}
  }catch(error){
    console.log({error})
    throw(error.message)
  }
}
