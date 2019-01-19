const express = require('express');
const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const List = require('./models/list');
const Board = require('./models/board');

mongoose.connect(keys.MONGODB_URI);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());

app.use((req, res, next) => {
   res.append('Access-Control-Allow-Headers', ['email']);
   res.append('Content-Type','application/json');
   next();
});

const mainRoutes = require('./routes/main');
const hardCodedData = require('./routes/hard-coded-data');
const organizationRoutes = require('./routes/organizations');
const boardRoutes = require('./routes/boards');
const cardRoutes = require('./routes/cards');
const loginRoutes = require('./routes/login');
const listRoutes = require('./routes/lists');

app.use(mainRoutes);
app.use(hardCodedData);
app.use(organizationRoutes);
app.use(boardRoutes);
app.use(cardRoutes);
app.use(loginRoutes);
app.use(listRoutes);

io.on('connection', client => {
  client.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  function cardMoveSameList ({ socketObj, newState }) {
    console.log('cardMoveSameList');
    List.findById(socketObj.listId, (err, list) => {
      list.cards.splice(socketObj.sourceIndex, 1);
      list.cards.splice(socketObj.destinationIndex, 0, socketObj.cardId);
      list.save((err, newList) => {
        if (err) throw err;
        List.findById(socketObj.listId)
          .populate({ path: 'cards' })
          .exec((err, updatedList) => {
            if (err) throw err;
            io.emit('updatedList', newState);
          });
      });
    });
  }

  function cardMoveDifferentList ({ socketObj, newState }) {
    console.log('cardMoveDifferentList');
    List.findById(socketObj.startListId, (err, oldList) => {
      oldList.cards.splice(socketObj.sourceIndex, 1);
      oldList.save((err, savedOldList) => {
        if (err) throw err;
        List.findById(socketObj.finishListId, (err, newList) => {
          newList.cards.splice(socketObj.destinationIndex, 0, socketObj.cardId);
          newList.save((err, savedNewList) => {
            if (err) throw err;
            io.emit('updatedList', newState);
          });
        });
      });
    });
  }

  function listMove ({ socketObj, newState }) {
    console.log('listMove');
    List.findById(socketObj.listId, (err, list) => {
      if (err) throw err;
      Board.findById(list.board._id, (err, board) => {
        if(err) throw err;
        board.lists.splice(socketObj.sourceIndex, 1);
        board.lists.splice(socketObj.destinationIndex, 0, socketObj.listId);
        board.save((err, savedBoard) => {
          if (err) throw err;
          io.emit('updatedList', newState);
        })
      })
    })
  }

  client.on('updateSameList', ({ socketObj, newState }) => {
    cardMoveSameList({ socketObj, newState });
  });

  client.on('updateDifferentList', ({ socketObj, newState }) => {
    cardMoveDifferentList({ socketObj, newState });
  });

  client.on('updateListPosition', ({socketObj, newState }) => {
    listMove({ socketObj, newState });
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
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log('Node.js listening on port ' + port);
});
