
var express = require('express');
var app = express();




/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
}

app.use(logger)


// --> 11)  Mount the body-parser middleware  here

var bodyParser = require('body-parser')

const parser = bodyParser.urlencoded({extended: false})
app.use(parser)

/** 1) Meet the node console. */

console.log('Hello World')


/** 2) A first working Express Server */

const endpoint1  = (req, res) => {
  res.send('Hello Express')
  }

// app.get('/', endpoint1)


/** 3) Serve an HTML file */

const endpoint2  = (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
}

app.get('/', endpoint2)


/** 4) Serve static assets  */

app.use(express.static(__dirname + '/public'))

/** 5) serve JSON on a specific route */

const endpointJSON  = (req, res) => {
  res.json({'message': 'Hello json'})
}

// app.get('/json', endpointJSON)


/** 6) Use the .env file to configure the app */

const endpointJSON1  = (req, res) => {
  const transform =  (message) => process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase(): message;
  res.json({'message': transform('Hello json')})
}

app.get('/json', endpointJSON1)
 


/** 8) Chaining middleware. A Time server */

const timeMidleware = (req, res, next) => {
  req.time = new Date().toString()
  next()
}

const nowEndpoint = (req, res) => {
  res.json({time: req.time})
}

app.get('/now', timeMidleware, nowEndpoint)


/** 9)  Get input from client - Route parameters */

const paramEndpoint = (req, res) => {
  res.json({echo: req.params.word})
}

app.get('/:word/echo', paramEndpoint)


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

const queryEndpoint = (req, res) => {
  res.json({name: `${req.query.first} ${req.query.last}`})
}

app.get('/name', queryEndpoint)


/** 12) Get data form POST  */

const postEndpoint = (req, res) => {
  res.json({name: `${req.body.first} ${req.body.last}`})
}

app.post('/name', postEndpoint)

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
