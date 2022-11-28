let express = require('express');
let bodyParser = require('body-parser');
let app = express();

//logger
app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}, bodyParser.urlencoded({extended: false}))

//static
const static_path = __dirname + "/public"
app.use('/public', express.static(static_path));

//JSON
app.get('/json', (req, res) => {
  response = {"message" : "Hello json"};
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
})

//Time
app.get('/now', (req, res, next) => {
  //add time to req
  req.time = new Date().toString();
  next();
  //chain middleware with handler
}, (req, res) => {
  res.json({"time": req.time});
})

//index
const file_path = __dirname + "/views/index.html"
app.get('/', (req, res) => {
  res.sendFile(file_path);
});

//server 'Hello Express'
app.get("/hello", (req, res) => {
  res.send("Hello Express");
});

//Echo chamber
app.get('/:word/echo', (req, res) => {
  res.send({"echo": req.params.word});
})

//Name
app.route('/name').get((req, res) => {
  res.json({"name": `${req.query.first} ${req.query.last}`});
}).post((req,res) => {
  console.log(req.body);
  console.log({"name": `${req.body.first} ${req.body.last}`})
  res.json({"name": `${req.body.first} ${req.body.last}`})
})



































 module.exports = app;
