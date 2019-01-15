const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const keys = require('./config/keys');


mongoose.connect(keys.MONGODB_URI);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

const mainRoutes = require('./routes/main')
const hardCodedData = require('./routes/hard-coded-data');
const organizationRoutes = require('./routes/organizations');
const boardRoutes = require('./routes/boards');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes)
app.use(hardCodedData);
app.use(organizationRoutes);
app.use(boardRoutes);
app.use(cardRoutes);

const port = process.env.PORT || 7000;


app.listen(port, () => {
  console.log('Node.js listening on port ' + port)
})