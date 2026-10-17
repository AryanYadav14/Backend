const express = require('express');
const app = express();
app.use(express.json()); // body parser
const db = require('./db'); // imported db.js


app.get('/', (req, res) => {
  res.send('Hello, welcome to our hotel!');
});


const personRoutes = require('./Routes/PersonRoutes');
app.use('/', personRoutes);

const chineseRoutes = require('./Routes/ChineseRoutes');
app.use('/', chineseRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});