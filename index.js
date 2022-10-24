const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 3000


let result = [{'user': 1, 'username': 'test'}, {'user' : 2, 'username': 'test'}]
let habits = [{"habit": 1,'habitname': 'todo1'}, {'habit': 2, 'habitname': 'todo2'}]

app.get('/', (req, res) => {
  res.send("Hello Kuba!!")
})

app.get('/get_users', (req, res) => {
  res.json(result)
})


app.post('/create_user', (req, res) => {
  console.log(req.body)
  result.push(req.body)
  res.json({'status': 'ok'})
})

app.get('/get_habits', (req, res) => {
  res.json(habits)
})

app.post('/create_habits', (req, res) => {
  console.log(req.body)
  habits.push(req.body)
  res.json({'status': 'ok'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// function p_log(s){
//   console.log('======')
//   console.log(s)
//   console.log('======')
// }


// let app = {
//   get: p_log,
//   listen: 34
// }

// app.get(123)