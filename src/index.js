var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/static'))

app
  .route('/todos')
  .post((req, res) => {
    publishMessage(req.body);
    return res.status(202).send({
      message: 'Email enviado con éxito'
    })
  })

app.listen(5000, function () {
  console.log('Escuchando en puerto 5000')
})
