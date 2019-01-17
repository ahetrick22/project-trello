const router = require('express').Router();
const Board = require('../models/board');
const List = require('../models/list');

const User = require('../models/user')
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });


//get all boards
router.get('/boards', requireAuth, (req, res) => {
  Board.find({})
    .populate({path: 'organization'})
    .exec((err, boards) => {
    if (err) throw err;
    res.send(JSON.stringify(boards));
  });
});

//get all boards of a specific user
router.get('/boards/:userId', requireAuth, (req, res) => {
  if (req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(req.params.userId, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.send(
          404,
          'No user found with that ID. Please register before accessing boards'
        );
      } else {
        User.findById(req.params.userId)
          .populate({
            path: 'organizations',
            populate: {
              path: 'boards'
            }
          })
          .exec((err, UserBoards) => {
            if (err) throw err;
            res.send(JSON.stringify(UserBoards));
          });
      }
    });
  }
});

//get a specific board
router.get('/board/:id', requireAuth, (req, res) => {
  //make sure it's a valid mongo ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching board
    Board.findById(req.params.id, (err, board) => {
      if (err) throw err;
      //if no board at that id, then tell the user
      if (!board) {
        res.send(404, 'No board with that id');
        //otherwise, populate the board with its lists and cards and send it
      } else {
        Board.findById(req.params.id)
          .populate({
            path: 'lists',
            populate: {
              path: 'cards'
            }
          })
          .exec((err, fullBoard) => {
            if (err) throw err;
            res.send(JSON.stringify(fullBoard));
          });
      }
    });
    //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
});

//ADD A NEW LIST to a specific board
router.post('/board/:id/list', requireAuth, (req, res) => {
  //make sure it's a valid mongo ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching board
    Board.findById(req.params.id, (err, board) => {
      if (err) throw err;
      //if no board at that id, then tell the user
      if (!board) {
        res.send(404, 'No board with that id');

        //otherwise, create the new list on that board and send it
      } else {
        let newList = new List({
          name: req.body.name,
          board: req.params.id,
          cards: []
        });

        newList.save((err, id) => {
          if (err) return err;
          let refnId = id;

          List.findById(refnId, (err, newList) => {
            if (err) throw err;
            board.lists.push(newList);
            board.save();
          });

          Board.findById(req.params.id)
            .populate({
              path: 'lists',
              populate: { path: 'cards' }
            })
            .exec((err, fullBoard) => {
              if (err) throw err;
              fullBoard.lists.push(newList);
              res.send(JSON.stringify(fullBoard));
            });
        });
      }
    });

    //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
});

//Updating a board's properties
router.put('/board/:id', requireAuth,  (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let updateObj = {};
    if (req.body.name) {
      updateObj.name = req.body.name;
    }
    if (Object.keys(updateObj).length === 0) {
      res.send(400, 'Body must have proper parameters');
    }
    let { id } = req.params;
    Board.findByIdAndUpdate(id, updateObj, (err, board) => {
      if (err) throw err;
      if (!board) {
        res.send(404, 'no board matching this id');
      } else {
        Board.findById(id)
          .populate({
            path: 'lists',
            populate: {
              path: 'cards'
            }
          })
          .exec((err, fullBoard) => {
            if (err) throw err;
            res.send(JSON.stringify(fullBoard));
          });
      }
    });
  } else {
    res.send(400, 'Invalid parameters for request');
  }
});

module.exports = router;
