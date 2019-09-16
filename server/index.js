var express = require("express")
var mailer = require('express-mailer')
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express();
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var API = require('./routes/API')

app.use(API)
app.listen(port, () => {
    console.log("Server running on port: " + port)
})
