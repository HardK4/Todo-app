const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 3000
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./keys.json');


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



let result = [{ 'user': 1, 'username': 'test' }, { 'user': 2, 'username': 'test' }]
let habits = [{ "habit": 1, 'habitname': 'todo1' }, { 'habit': 2, 'habitname': 'todo2' }]

app.get('/', async (req, res) => {
  let h = []
  const snapshot = await db.collection('habits').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
  h.push(doc.data())
});

  res.json(h)
})

app.get('/get_users', (req, res) => {
  res.json(result)
})


app.post('/create_user', (req, res) => {
  console.log(req.body)
  result.push(req.body)
  res.json({ 'status': 'ok' })
})

app.get('/get_habits', (req, res) => {
  res.json(habits)
})

app.post('/create_habits', async (req, res) => {
  const docRef = db.collection('habits').doc(makeid(10));

await docRef.set(req.body);
  console.log(req.body)
  habits.push(req.body)
  res.json({ 'status': 'ok' })
})

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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