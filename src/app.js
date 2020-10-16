require('dotenv').config()

const chalk = require('chalk')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsDirectoryPath = path.join(__dirname, '..', 'templates/views')
const partialsDirectoryPath = path.join(__dirname, '..', 'templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup directory for static assets
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lahiru Kariyawasam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lahiru Kariyawasam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lahiru Kariyawasam'
    })
})

app.get('/weather', ((req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    const address = req.query.address

    geocode(address, (geocodeError, geocodeData) => {
        // console.log('Geocode')

        if (geocodeError) {
            return res.send({
                error: geocodeError
            })
        }

        forecast(geocodeData.latitude, geocodeData.longitude, (forecastError, forecastData) => {
            // console.log('\nForecast')

            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            return res.send({
                success: true,
                address,
                forecast: forecastData
            })
        })
    })
}))

app.get('/help/*', ((req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Lahiru Kariyawasam',
        errorMessage: 'Article not found'
    })
}))

app.get('*', ((req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Lahiru Kariyawasam',
        errorMessage: 'Page not found'
    })
}))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(chalk.green(`Server started on port ${PORT}`))
})