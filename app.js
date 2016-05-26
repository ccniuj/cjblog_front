var express = require('express')
var path = require('path')
var compression = require('compression')
var app = express()
var server = require('http').Server(app)
var env = process.env.ENV ? process.env.ENV : 'production';
var config = require('./config.json')[env]

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
server.listen(config.port, function() {
  console.log('Server start listening on port ' + config.port)
})