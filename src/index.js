var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

const db = require('../queries')

app.use(cors())
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/static'))

let todos = []

app
  .route('/todos')
  .get((req, res) => {
    // res.json({ todos })
    db.getTasks(req, res)
  })
  .post((req, res) => {
    // todos = req.body.todos
    // res.json({ msg: 'Se actualizó las tareas' })
    db.createTask(req, res)
  })

app.listen(5000, function () {
  console.log('Escuchando en puerto 5000')
})
