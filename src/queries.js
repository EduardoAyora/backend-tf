const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

const moveMoney = (request, confirm) => {
  // const from = request.from
  const to = request.to
  const quantity = request.money

  pool.query('SELECT * FROM users WHERE email = ?', [to], (error, results) => {
    if (error) {
      throw error
    }
    console.log('ingreso')
    const currentMoney = results[0].money

    pool.query(
      'UPDATE users SET money = ? WHERE email = ?',
      [currentMoney + quantity, to],
      (err, result) => {
        if (err) throw err
        confirm()
      }
    )
  })
}

module.exports = {
  moveMoney,
}
