var express = require('express')
var path = require('path')
var compression = require('compression')
var app = express()
var server = require('http').Server(app)

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
var PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
  console.log('Server start listening on port ' + PORT)
})