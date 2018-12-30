const mongoose = require('mongoose')
const URI = 'mongodb://admin:test00@ds245234.mlab.com:45234/mern-task';

  mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB Connected'))
    .catch(err => console.error(err))

module.exports = mongoose