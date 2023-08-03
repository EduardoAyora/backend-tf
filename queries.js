// psql -h localhost -U postgres

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '146.190.52.254',
  database: 'app',
  password: 'postgres',
  port: 5432,
})

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tareas ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({ todos: results.rows })
  })
}

const createTask = async (request, response) => {
  const tareas = request.body.todos

  await pool.query('DELETE FROM tareas', [], (error, results) => {
    if (error) {
      throw error
    }
  })

  console.log('se borro todo');

  for (let index in tareas) {
    const tarea = tareas[index]
    await pool.query(
      'INSERT INTO tareas (texto, completado) VALUES ($1, $2)',
      [tarea.texto, tarea.completado],
      (error, results) => {
        if (error) {
          throw error
        }
      }
    )
  }

  response.status(201).json({ msg: 'Se actualizó las tareas' })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getTasks,
  createTask,
  updateUser,
  deleteUser,
}
