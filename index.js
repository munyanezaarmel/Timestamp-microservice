// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api",(req,res)=>{
 return res.json({
  unix:new Date().getTime(),
  utc:new Date().toUTCString()
})
})
// app.get("/api/:timestamp",(req,res)=>{
//  const timestamp=req.params.timestamp

//  if(!isNaN(Number(timestamp)) && timestamp.length==13){
//   console.log(timestamp)
//   console.log({unix:timestamp,utc:new Date(Number(timestamp)).toUTCString()})
// return res.json({unix:timestamp,utc:new Date(Number(timestamp)).toUTCString()})
//  }
   
//  if(new Date(timestamp).toUTCString() !=='Invalid Date'){
// return res.json({unix:new Date(timestamp).getTime(),utc:new Date(timestamp).toUTCString()})
//  }
//  res.send({ error : "Invalid Date" })
// })

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date
  const dateStringRegex = /^[0-9]+$/
  const numbersOnly = dateStringRegex.test(dateString)
 
  if (!numbersOnly) {
    const unixTimestamp = Date.parse(dateString)
    const utcDate = new Date(unixTimestamp).toUTCString()
 
    unixTimestamp
    ? res.json({ unix: unixTimestamp, utc: utcDate })
    : res.json({ error: "Invalid Date" })
  } 
  else {
    const unixTimestamp = parseInt(dateString)
    const actualDate = new Date(unixTimestamp)
    const utcDate = actualDate.toUTCString()
 
    res.json({ unix: unixTimestamp, utc: utcDate })
  }
 
   app.get('/api', (req, res) => {
     const currentDate = new Date().toUTCString()
     const currentUnix = Date.parse(currentDate)
     res.json({ unix: currentUnix, utc: currentDate })
   })
 })
 


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
