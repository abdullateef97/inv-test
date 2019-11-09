const city_tz = require('city-timezones')
const moment_tz = require('moment-timezone')
const geo_tz = require('geo-tz')


exports.getTimeZoneFromCityName = city_name => {
  const tz_response = city_tz.lookupViaCity(city_name)
  console.log({tz_response})
  return tz_response && tz_response.length > 0 ? tz_response[0].timezone : null
}

exports.getTimezoneFromLatLong = (lat, long) => {
  return geo_tz(lat, long)[0]
}


exports.getCurrentTimeFromTimezone = timezone => timezone && typeof timezone === 'string' ?
  moment_tz().tz(timezone).format('MMMM Do YYYY, h:mm a') : null

