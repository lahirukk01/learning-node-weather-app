const axios = require('axios')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?` +
    `access_token=${process.env.MAPBOX_API_KEY}&limit=1`

    axios.get(url)
        .then(response => {
            if (response.data.features.length === 0) {
                callback('Failed to find location', undefined)
            } else {
                callback(undefined, {
                    longitude: response.data.features[0].center[0],
                    latitude: response.data.features[0].center[1]
                })
            }
        })
        .catch(error => {
            callback(error, undefined)
        })
}

module.exports = geocode