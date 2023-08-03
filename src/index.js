var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
const { publishMessage } = require('./moneyWorker')

app.use(cors())
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/static'))

app
  .route('/movement')
  .post((req, res) => {
    publishMessage(req.body);
    return res.status(202).send({
      message: 'Dinero enviado, se transferirá en brevedad'
    })
  })

app.listen(5001, function () {
  console.log('Escuchando en puerto 5001')
})
