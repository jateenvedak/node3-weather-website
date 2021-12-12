const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=edee3ec07ee9e5c009c46fdfd6c2f243&query=' + latitude + ',' + longitude + '&units=f';
    const url = 'http://api.weatherstack.com/current?access_key=edee3ec07ee9e5c009c46fdfd6c2f243&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to location service!", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const current = body.current;
            var responseString = current.weather_descriptions[0] + ". It is currently " + current.temperature + " out. It feels like " + current.feelslike + ". There is a " + current.precip + "% chance of rain."
            callback(error, responseString)
        }
    })
}

module.exports = forecast;