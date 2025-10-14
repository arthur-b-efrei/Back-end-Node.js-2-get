const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>bonjour html</h1></body></html>')
})

app.get('/some-json', (req, res) => {
  const personne = { age: 22, nom: 'Jane' }
  res.json(personne)
})

app.get('/transaction', (req, res) => {
    const transactions = [100, 2000, 3000]
    res.json({
      headers: req.headers,
      body: req.body || null,
      transactions
    })
})

app.get('/exo-query-string', (req, res) => {
  console.log('req.query =', req.query)
  const { age } = req.query
  if (!age) {
    return res.send('hello')
  }
  res.send(`<h1>${age}</h1>`)
})

app.get('/user/:userId', (req, res) => {
    const { userId } = req.params
    res.send(`<h1>User ${userId}</h1>`)
})
app.get('/get-user/:userId', (req, res) => {
  const { userId } = req.params
  res.send(`<h1>User ${userId}</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
