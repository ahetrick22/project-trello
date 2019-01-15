const router = require('express').Router();
const Card = require('../models/card');

router.get('/card/:id', (req, res) => {
   //make sure it's a valid ID and won't trigger a cast error
   if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching card
    Card.findById(req.params.id, (err, card) => {
      if(err) throw err;
      //if no card at that id, then tell the user
      if (!card) {
        res.send(404, 'No card with that id');
      //otherwise, populate the card with its comments and send it
      } else {
        Card.findById(req.params.id, (err, fullCard) => 
        fullCard.populate('comments', () => {
          if(err) throw err;
          res.send(JSON.stringify(fullCard));
        })
        )}
    })
  //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
})

module.exports = router;