const {expect} = require('chai')

const {getWeatherAndTimezone} = require('../main')

describe('Get Weather and Current Time by ', () => {
  it('should return a response with same length as query array passed', async () => {
    let query_array = ['lagos', 'london']
    let response = await getWeatherAndTimezone(query_array)
    expect(response).to.exist
    expect(response).to.be.an('array')
    expect(response.length).to.equal(query_array.length)
  })

  it('response object at index of query item should return an error if it\'s an invalid Postal code', async () => {
    let query_array = ['lagos', '1000000A']
    let response = await getWeatherAndTimezone(query_array)
    let postal_code_response = response[1]
    expect(response).to.exist
    expect(response).to.be.an('array')
    expect(postal_code_response).to.exist
    expect(postal_code_response).to.be.an('object')
    expect(postal_code_response['City or Zip Code Supplied']).to.be.equal(query_array[1])
    expect(postal_code_response['Request Failed']).to.equal(true)
    expect(postal_code_response['Error Message'].length).to.gt(1)
  })

  it('response object at index of query item should return an error if it\'s an invalid City name', async () => {
    let query_array = ['lagos', 'Alobam']
    let response = await getWeatherAndTimezone(query_array)
    let postal_code_response = response[1]
    expect(response).to.exist
    expect(response).to.be.an('array')
    expect(postal_code_response).to.exist
    expect(postal_code_response).to.be.an('object')
    expect(postal_code_response['City or Zip Code Supplied']).to.be.equal(query_array[1])
    expect(postal_code_response['Request Failed']).to.equal(true)
    expect(postal_code_response['Error Message'].length).to.gt(1)
  
  })

  it("each object of the response array should contain 13 items", async () => {
    let query_array = ['lagos', 'london']
    let response = await getWeatherAndTimezone(query_array)
    expect(response).to.exist
    expect(response).to.be.an('array')
    expect(Object.keys(response[0]).length).to.equal(13)
    expect(Object.keys(response[1]).length).to.equal(13)
  })

  it("each object of the response array should have error set to false if all items in query array are valid", async () => {
    let query_array = ['lagos', 'london', 'new york']
    let response = await getWeatherAndTimezone(query_array)
    expect(response).to.exist
    expect(response).to.be.an('array')
    expect(response[0]).to.be.an('object')
    expect(response[0]['Request Failed']).to.be.equal(false)
    expect(response[1]).to.be.an('object')
    expect(response[1]['Request Failed']).to.be.equal(false)
    expect(response[2]).to.be.an('object')
    expect(response[2]['Request Failed']).to.be.equal(false)
  })
})