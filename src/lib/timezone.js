const city_tz = require('city-timezones')
const moment_tz = require('moment-timezone')

/**
 * Returns Timezone from City Name
 * param = city_name
 */
exports.getTimeZoneFromCityName = city_name => {
  const tz_response = city_tz.lookupViaCity(city_name)
  return tz_response && tz_response.length >= 0 ? tz_response[0].timezone : null
}

/**
 * Returns Current Time Based on Timezone
 * param = timezone
 */
exports.getCurrentTimeFromTimezone = timezone => timezone && typeof timezone === 'string' ?
  moment_tz().tz(timezone).format('MMMM Do YYYY, h:mm:ss a') : null

