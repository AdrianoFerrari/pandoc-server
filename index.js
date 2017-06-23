const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const stream = require('stream')
const join = require('path').join
const pdc = require('pdc')

var rawParser = bodyParser.raw()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', rawParser, function (req, res) {
  var outputFormat = 'docx'
  var fileName = `test-${Date.now()}.${outputFormat}`
  var tmpPath = join(__dirname, './tmp', fileName)

  var pandoc = pdc.stream('html', 'docx', [ '-o', tmpPath])

  pandoc.on('close', (code) => {
    if (code == 0) {
      fs.createReadStream(tmpPath).pipe(res);
    }
  })

  pandoc.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  var inputStream = new stream.PassThrough()
  inputStream.end(req.body)
  inputStream.pipe(pandoc.stdin)

  //res.send('done')
})

app.listen(3000, function() {
  console.log('example app listening on 3000!')
})
