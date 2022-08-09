const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8080;
const api = require('./router/api');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', api);
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`App running on ${port}, visit http://localhost:${port} to see`);
  });

  
  app.get('/', function (req, res) {
    res.status(200).send('hello from root');
  })