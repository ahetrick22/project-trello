const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');

mongoose.connect('mongodb://localhost/ProjectTrello')

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

app.listen(7000, () => {
  console.log('Node.js listening on port ' + 7000)
})