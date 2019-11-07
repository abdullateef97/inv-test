const {open_weather_api_app_id} = require('./config')

const API_BASE_URL = `http://api.openweathermap.org/data/2.5/weather/?APPID=${open_weather_api_app_id}&`
const getWeatherByCityNameBaseUrl = `${API_BASE_URL}q=`
const getWeatherByZipCodeBaseUrl = `${API_BASE_URL}z=`


const getWeatherByCityNameEndpoint = city_name => `${getWeatherByCityNameBaseUrl}${city_name}`
const getWeatherByZipCodeEndpoint = zip_code => `${getWeatherByZipCodeBaseUrl}${zip_code}`

module.exports = {
    getWeatherByCityNameEndpoint,
    getWeatherByZipCodeEndpoint
}
