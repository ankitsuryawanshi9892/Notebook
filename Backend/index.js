const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors'); 
connectToMongo();
const app = express()
const port = 5000
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// console.log(path.join(__dirname,'../uploads'))
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res)=>{
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})