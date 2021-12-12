const express = require('express');
const path = require('path');
const hbs = require('hbs')
const forecast = require('./utils/foreCast');
const geocode = require('./utils/geoCode')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jateen Vedak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jateen Vedak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Helpful content',
        title: 'Help',
        name: 'Jateen Vedak'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        })
    }
    console.log("query", req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article not found!',
        title: '404 help',
        name: 'Jateen Vedak'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Jateen Vedak'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})