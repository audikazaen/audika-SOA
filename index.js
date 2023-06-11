// from browser type :    http://localhost:3000/

/*
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
// from browser type :    http://localhost:3000/

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/matakul', (req, res) => {
  res.send(['MAT101','BIO202','FIS303'])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
