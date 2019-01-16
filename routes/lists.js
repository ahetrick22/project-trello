const router = require('express').Router();
const Card = require('../models/card');
const List = require('../models/list');
const Board = require('../models/board');

router.post('/list/:id/card', (req, res) => {


  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    List.findById(req.params.id, (err, list) => {
      if(err) throw err;
      //if no list at that list id, then tell the user
      if (!list) {
        res.send(404, 'That is no such List');
      //otherwise, populate the list with its id and send it
      }
     else {
        let newCard = new Card( {
            title: req.body.title,
            list: req.body.list,
            label: req.body.label,
            description: req.body.description,
            comments: [],
            activity: []
          
          });
        
        newCard.save((err, _id) => {
            if (err) return err
            let cardnId = _id;
        
        //   let cardId = newCard._id;
          Card.findById(cardnId, (err, newCard) => {
          if (err) throw err;
          list.cards.push(newCard);
          list.save(function (err, list) {
              if(err) throw err;
          List.findById(req.params.id, (err, updatedList) => {
              const boardId = updatedList.board;
              Board.findById(boardId).populate({
                path: 'lists',
                populate: {
                    path: 'cards'
                    }
                }).exec((err, fullBoard) => {
                    if(err) throw err;
                    res.send(JSON.stringify(fullBoard));
                  });
              })
          })         
    })  
   })
  }
 })
}

  else {
    res.send(400, 'Send a valid Card as a parameter');
  }
})

module.exports = router;