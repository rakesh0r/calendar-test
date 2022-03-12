const mongoose = require('mongoose')

// instantiate a mongoose schema
const ShortenURLSchema = new mongoose.Schema({
    code: String,
    url: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
module.exports = mongoose.model('ShortenURL', ShortenURLSchema)