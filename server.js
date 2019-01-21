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

app.enable('trust proxy');


app.use((req, res, next) => {
  res.append('Access-Control-Allow-Headers', ['email', 'Authorization', 'x-forwarded-proto', 'host']);
  //res.append('Content-Type','application/json');
  next();
});

app.use(cors());

if (process.env.NODE_ENV === 'production') {
app.use(function(req, res, next){
  console.log('request', req);
  if(req.header('x-forwarded-proto') !== 'https'){
    console.log('redirecting', req);
    res.redirect('https://whispering-anchorage-65843.herokuapp.com' + req.url);
  }else{
    next();
  }
})
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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
    List.findById(socketObj.listId, (err, list) => {
      if (!list.frozen) {
        list.frozen = true;   
        list.cards.splice(socketObj.sourceIndex, 1);
        list.cards.splice(socketObj.destinationIndex, 0, socketObj.cardId);
        list.save((err, newList) => {
          if (err) throw err;
              newList.frozen = false;
              newList.save();
              io.emit('updatedList', newState);
            });

      } else {
        io.emit('errorUpdating');
      }
    });
  }

  function cardMoveDifferentList ({ socketObj, newState }) {
    List.findById(socketObj.startListId, (err, oldList) => {
      if(!oldList.frozen) {
        oldList.frozen = true;
        oldList.cards.splice(socketObj.sourceIndex, 1);
        oldList.save((err, savedOldList) => {
          if (err) throw err;
          List.findById(socketObj.finishListId, (err, newList) => {
            if(!newList.frozen) {
              newList.frozen = true;
              newList.cards.splice(socketObj.destinationIndex, 0, socketObj.cardId);
              newList.save((err, savedNewList) => {
                if (err) throw err;
                savedNewList.frozen = false;
                savedNewList.save();
                savedOldList.frozen = false;
                savedOldList.save();
                io.emit('updatedList', newState);
              });
            } else {
              savedOldList.frozen = false;
              savedOldList.save();
              io.emit('errorUpdating');
            }
          });
        });
      } else {
        io.emit('errorUpdating');
      }
    });
  }

  function listMove ({ socketObj, newState }) {    
    List.findById(socketObj.listId, (err, list) => {
      if (err) throw err;
      Board.findById(list.board._id, (err, board) => {
        if(err) throw err;
        if (!board.frozen) {
          board.frozen = true;
          board.lists.splice(socketObj.sourceIndex, 1);
          board.lists.splice(socketObj.destinationIndex, 0, socketObj.listId);
          board.save((err, savedBoard) => {
            if (err) throw err;
            savedBoard.frozen = false;
            savedBoard.save();
            io.emit('updatedList', newState);
          })
        } else {
          io.emit('errorUpdating');
        }
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
