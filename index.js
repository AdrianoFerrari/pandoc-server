const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const spawn = require('child_process').spawn

var rawParser = bodyParser.raw()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', rawParser, function (req, res) {
  var tmpPath = `./tmp/test-${Date.now()}.docx`

  fs.writeFile(tmpPath, req.body, (err) => {
    if(err) {
      return console.log(err)
    }

    var args = ['-f','docx','-t','markdown', tmpPath]
    var pandoc = spawn('pandoc', args)
    pandoc.stdout.pipe(res)
  })
})

app.listen(3000, function() {
  console.log('example app listening on 3000!')
})
