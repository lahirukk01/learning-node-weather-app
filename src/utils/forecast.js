const axios =require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`

    axios.get(url)
        .then(response => {
            if (response.error) {
                callback(response.error.info, undefined)
            } else {
                // console.log(response.data.current)
                callback(undefined, `${response.data.current.weather_descriptions[0]}. ` +
                    `It is currently ${response.data.current.temperature} C. ` +
                    `There is a ${response.data.current.precip}% chance of rain.`)
            }
        })
        .catch(error => {
            callback(error, undefined)
        })
}

module.exports = forecast


