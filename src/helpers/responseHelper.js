
const respond = (data) => {
  return {
      "City or Zip Code Supplied": data.query,
      "Request Failed": data.failed || false,
      "Error Message": data.error_msg || '',
      "City": data.city || '',
      "Current Time": data.time || '',
      "TimeZone": data.timezone || '',
      "Weather": data.weather || '',
      "Weather Description": data.weather_desc || '',
      "Temperature (K)": data.temp || '',
      "Pressure (hPa)": data.pressure || '',
      "Humidity (%)": data.humidity || '',
      "Wind Speed (m/s)": data.wind_speed || '',
      "Wind Direction (deg)": data.wind_deg || ''
  }
}

exports.successResponse = data => respond({...data, failed: false, error_msg: ''})
exports.failureResponse = data => data.error_msg ? respond({...data, failed: true}) :
                                        respond({...data, failed: true, error_msg: 'Unknown Error'})

exports.logResponseToConsole = data => console.table(data)
