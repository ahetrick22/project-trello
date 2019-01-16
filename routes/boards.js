const router = require('express').Router();
const Board = require('../models/board');
const List = require('../models/list');



//get all boards
router.get('/boards', (req, res) => {
  Board.find({}, (err, boards) => {
    if (err) throw err;
    res.send(JSON.stringify(boards));
  });
});

//get a specific board
router.get('/board/:id', (req, res) => {
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
        Board.findById(req.params.id).populate({
          path: 'lists',
          populate: {
            path: 'cards'
          }
        }).exec((err, fullBoard) => {
          if (err) throw err;
          res.send(JSON.stringify(fullBoard));
        })
      }
    })
    //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
})

//ADD A NEW LIST to a specific board
router.post('/board/:id/list', (req, res) => {
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
          board: req.body.id,
          cards: []
        });

        newList.save((err, id) => {
          if (err) return err;
          let refnId = id;

          List.findById(refnId, (err, newList) => {
            if (err) throw err;
            board.lists.push(newList);
            board.save();
          })
        })

        Board.findById(req.params.id).populate({
          path: 'lists',
          populate: {
            path: 'cards'
          }
        }).exec((err, fullBoard) => {
          if (err) throw err;
          res.send(JSON.stringify(fullBoard));
        })
      }

    })

    //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
})

//Updating a board's properties
router.put('/board/:id', (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let updateObj = {};
    if (req.body.name) {
      updateObj.name = req.body.name
    }
    if (Object.keys(updateObj).length === 0) {
      res.send(400, 'Body must have proper parameters')
    }
    let { id } = req.params;
    Board.findByIdAndUpdate(id, updateObj, (err, board) => {
      if (err) throw err;
      if (!board) {
        res.send(404, 'no board matching this id');
      } else {
        Board.findById(id).populate({
          path: 'lists',
          populate: {
            path: 'cards'
          }
        }).exec((err, fullBoard) => {
          if (err) throw err;
          res.send(fullBoard)
        })
      }
    })
  } else {
    res.send(400, 'Invalid parameters for request')
  }
})



module.exports = router;