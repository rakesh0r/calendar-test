const express = require('express')
const { nanoid } = require('nanoid')
const isValidUrl = require('../utils/urlValidator')
// creating express route handler
const router = express.Router()
const shortenUrl = require('../models/shortenUrl')


// The API base Url endpoint
const baseUrl = 'http://localhost:3000'

router.post('/shorten', async (req, res) => {
    const {
        url
    } = req.body
    console.log(req)
    // if valid, we create the url code
    const urlCode = nanoid(10)
    console.log(url)
    if (isValidUrl(url)) {
        try {
            
            let checkUrlExists = await shortenUrl.findOne({
                url
            })

            // url exist and return the respose
            if (checkUrlExists) {
                res.json(checkUrlExists.shortUrl)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                const urlData = new shortenUrl({
                    url,
                    shortUrl,
                    code: urlCode,
                    date: new Date()
                })
                await urlData.save()
                res.json(urlData.shortUrl)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router