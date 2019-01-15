const router = require('express').Router();
const Board = require('../models/board');


//get all boards
router.get('/boards', (req, res) => {
  Board.find({}, (err, boards) => {
    if (err) throw err;
    res.send(JSON.stringify(boards));
  });
});

//get a specific board
router.get('/board/:id', (req, res) => {
  //make sure it's a valid ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching board
    Board.findById(req.params.id, (err, board) => {
      if(err) throw err;
      //if no board at that id, then tell the user
      if (!board) {
        res.send(404, 'No board with that id');
      //otherwise, populate the board with its lists and cards and send it
      } else {
        Board.findById(req.params.id).populate({
          path: 'lists', 
          populate: {
            path: 'cards'
          }
        }).exec((err, fullBoard) => {
          if(err) throw err;
          res.send(JSON.stringify(fullBoard));
        })
      }
    })
  //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
})

module.exports = router;