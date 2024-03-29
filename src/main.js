const dotenv = require('dotenv')
dotenv.config()

const {successResponse, failureResponse, logResponseToConsole} = require('./helpers/responseHelper')
const {getCurrentTimeFromTimezone, getTimeZoneFromCityName, getTimezoneFromLatLong} = require('./helpers/timezoneHelper')
const {getWeatherByCityName} = require('./services/cityService')
const {getWeatherByZipCode, isEntryAZipCode, parseZipCode} = require('./services/zipService')
const {log_instruction} = require('./helpers/instructions')

const _parseWeatherSuccessResponse = (response, data) => {
  return {
    ...response,
    weather: data.weather[0].main,
    weather_desc: data.weather[0].description,
    temp: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg
  }
}


const _getWeatherAndTimezoneByCityName = async city_name => {
  let response = {query: city_name, city: city_name}
  let timezone = getTimeZoneFromCityName(city_name)
  let time = getCurrentTimeFromTimezone(timezone)

  response = {...response, timezone: timezone || 'Unable to get Timezone', time: time || 'Unable to Get Cities Current Time'}

  try{
    let open_weather_map_response = await getWeatherByCityName(city_name)
    if(!open_weather_map_response || open_weather_map_response.cod !== 200) {
      response.error_msg = `Unable to retrieve weather info for City ${city_name}`
      return failureResponse(response)
    }

    return successResponse(_parseWeatherSuccessResponse(response, open_weather_map_response))
  }catch(error){
    response.error_msg = error
    return failureResponse(response)
  } 
  
}

const _getWeatherAndTimezoneFromZipCode = async zip_code => {
  zip_code = parseZipCode(zip_code)
  let response = {query: zip_code}

  try{
    let open_weather_map_response = await getWeatherByZipCode(zip_code)
    if(!open_weather_map_response || open_weather_map_response.cod !== 200) {
      response.error_msg = `Unable to retrieve weather info for Zip code ${zip_code}`
      return failureResponse(response)
    }

    let {name, coord} = open_weather_map_response
    response.city = name
    let timezone = getTimezoneFromLatLong(coord.lat, coord.lon)
    let time = getCurrentTimeFromTimezone(timezone)
    response = {...response, timezone: timezone || 'Unable to get Timezone', time: time || 'Unable to Get Cities Current Time'}

    return successResponse(_parseWeatherSuccessResponse(response, open_weather_map_response))

  }catch(error){
    response.error_msg = error
    return failureResponse(response)
  }
}

_genPromiseArray = query_array => {
  return query_array.map(query => {
    query = query.trim()
    return isEntryAZipCode(query) ? _getWeatherAndTimezoneFromZipCode(query) : _getWeatherAndTimezoneByCityName(query)
  })
}

const getWeatherAndTimezone = async query_array => await Promise.all(_genPromiseArray(query_array))

app = async query_array => {
  logResponseToConsole(await getWeatherAndTimezone(query_array))
  console.log('\n \n')
}

module.exports = {
  app, getWeatherAndTimezone
}