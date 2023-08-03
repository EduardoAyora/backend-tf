// psql -h localhost -U postgres

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'app',
  password: 'postgres',
  port: 5432,
})

const moveMoney = async (request) => {
  // const from = request.from
  const to = request.to
  const quantity = request.money

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [to], (error, results) => {
    if (error) {
      throw error
    }
  })

  console.log('user');
  console.log(user);

  await pool.query(
    'UPDATE INTO users (money) VALUES ($1) WHERE email = $2',
    [quantity, to],
    (error, results) => {
      if (error) {
        throw error
      }
    }
  )
}


module.exports = {
  moveMoney
}
