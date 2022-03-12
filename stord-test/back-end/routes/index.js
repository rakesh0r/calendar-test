var express = require('express');
var router = express.Router();
const shortenUrl = require('../models/shortenUrl')


router.get('/:code', async (req, res) => {
    try {
        // find a document match to the code in req.params.code
        const urlObj = await shortenUrl.findOne({
            code: req.params.code
        })
        if (urlObj && urlObj.url) {
            // when valid we perform a redirect
            return res.redirect(urlObj.url)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router;
