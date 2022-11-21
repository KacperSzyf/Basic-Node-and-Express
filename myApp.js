let express = require('express');
let app = express();

//logger
app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

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

//index
const file_path = __dirname + "/views/index.html"
app.get('/', (req, res) => {
  res.sendFile(file_path);
});

//server 'Hello Express'
app.get("/hello", (req, res) => {
  res.send("Hello Express");
});


































 module.exports = app;
