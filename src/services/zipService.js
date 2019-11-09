const getResource = require('../config/axios')
const {getWeatherByZipCodeEndpoint} = require('../config/endpoints')


exports.getWeatherByZipCode = async zip_code => {
  try{
    let response = await getResource(getWeatherByZipCodeEndpoint(zip_code))
    return response.status === 200 ? response.data : () => {throw('Please Provide A Valid Postal Code')}
  }catch(error){
    console.log({error})
    throw(error.message)
  }
}

exports.isEntryAZipCode = entry => {
  let split_entry_array = entry.split('')
  return split_entry_array.length > 0 && !isNaN(split_entry_array[0])
}

exports.parseZipCode = zip_code => zip_code.split('.').join(',')
