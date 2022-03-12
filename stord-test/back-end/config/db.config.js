const mongoose = require('mongoose')

const DB_URI = 'mongodb://root:root@localhost:27017'

// establishing a database connection
mongoose.connect(DB_URI, {
    dbName: 'stord',
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

module.exports = connection