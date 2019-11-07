const axios = require('axios')

const getResource = url => axios.get(url)

module.exports = getResource
