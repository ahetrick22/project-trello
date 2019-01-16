const app = require('express')();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const keys = require('./config/keys');
const server = require('http').Server(app);
const io = require('socket.io')(server);


mongoose.connect(keys.MONGODB_URI);

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
//const loginRoutes = require('./routes/login');
const listRoutes = require('./routes/lists');

app.use(mainRoutes)
app.use(hardCodedData);
app.use(organizationRoutes);
app.use(boardRoutes);
app.use(cardRoutes);
//app.use(loginRoutes);
app.use(listRoutes);

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log('Node.js listening on port ' + port)
})