
const _respond = (data) => {
  return {
      "City or Zip Code Supplied": data.query,
      "Request Failed": data.failed || false,
      "Error Message": data.error_msg || '',
      "City": data.city || '',
      "TimeZone": data.timezone || 'Error Getting Timezone',
      "Current Time": data.time || 'Error Getting Cities Current Time',
      "Weather": data.weather || '',
      "Weather Description": data.weather_desc || '',
      "Temperature (K)": data.temp || '',
      "Pressure (hPa)": data.pressure || '',
      "Humidity (%)": data.humidity || '',
      "Wind Speed (m/s)": data.wind_speed || '',
      "Wind Direction (deg)": data.wind_deg || ''
  }
}

exports.successResponse = data => _respond({...data, failed: false, error_msg: ''})
exports.failureResponse = data => data.error_msg ? _respond({...data, failed: true}) :
                                        _respond({...data, failed: true, error_msg: 'Unknown Error'})

// exports.logResponseToConsole = data => console.table(data)
exports.logResponseToConsole = data => {
  let final_response_object = {}
  let keys = Object.keys(data[0])

  keys.forEach(key => {
    let array_of_values = data.map(obj => obj[key])
    final_response_object[key] = array_of_values;
  })
  console.table(final_response_object)
}
