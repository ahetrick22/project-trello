//PUT list/listid (Update a list name)

const router = require('express').Router();
const bodyParser = require('body-parser');
const List = require('../models/list');
const Board = require('../models/board');

router.put('/list/:id', (req, res) => {
    //check to see which params come in the body
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let updateObject = {};
        if(req.body.name) {
            updateObject.name = req.body.name;
        }
        //make sure the correct body was sent
        if (Object.keys(updateObject).length === 0) {
            res.send(400, "Body must have a name parameter ");
        }

        let { id } = req.params;
        //find the list with the provided ID
        List.findByIdAndUpdate(id, updateObject,(err, list) => {
            if(err) throw err;
            if (!list) {
                res.send(404, 'no list with that id');
            } else {
              //send back the board with that list on it with all lists and cards populated
              List.findById(id, (err, updatedList) => {
                const boardId = updatedList.board;
                Board.findById(boardId).populate({
                  path: 'lists',
                  populate: {
                    path: 'cards'
                  }
                }).exec((err, fullBoard) => {
                  if (err) throw err;
                  res.send(JSON.stringify(fullBoard));
                })
              })

            }
        })
    } else {
        res.send(400, 'Send a valid object ID as a parameter');
      }
    })
            
module.exports = router;
