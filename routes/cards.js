const router = require('express').Router();
const Card = require('../models/card');
const Comment = require('../models/comment')

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


router.put('/card/:id', (req, res) => {
  //check to see which params come in the body
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      let updateObject = {};
      if(req.body.title) {
          updateObject.title = req.body.title;
      }

      if (req.body.label) {
          updateObject.label = req.body.label;
      }

      if (req.body.description) {
          updateObject.description = req.body.description;
      }
      
      if (Object.keys(updateObject).length === 0) {
          res.send(400, "Body must have parameters matching parameters");
      }

      let { id } = req.params;
      Card.findByIdAndUpdate(id, updateObject,(err, card) => {
          if(err) throw err;
          if (!card) {
              res.send(404, 'no card with that id');
          } else {
              Card.findById(id).populate({
                  path: 'comments'
              }).exec((err, fullCard) => {
                  if(err) throw err;
                  res.send(JSON.stringify(fullCard));
              })
          }
      })
  } else {
      res.send(400, 'Send a valid object ID as a parameter');
    }
  })

//adds a new comment to a card
router.post('/card/:id/comment', (req, res) => {
    //make sure it's a valid ID and won't trigger a cast error
   if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching card
    Card.findById(req.params.id, (err, card) => {
      if(err) throw err;
      //tells user if no card with that id
      if (!card) {
        res.send(404, 'No such card');
      } else {
        //create your comment
        let newComment = new Comment({
            //user: {},
            text: req.body.text
            //card: req.body.id
        });

        newComment.save((err, savedComment) => {
            if (err) throw err;
            let commentId = savedComment._id;
            Comment.findById(commentId, (err, newComment) =>{
                if (err) throw err;
                card.comments.push(newComment);
                card.save(function (err, card) {
                    if (err) throw err;
                    Card.findById(req.params.id).populate({
                            path: 'comments'
                        }).exec((err, fullcard) => {
                            if (err) throw err;
                            res.send(JSON.stringify(fullcard));
                      //  })
                    })
                })
            })
        })
    }
})
   } else {
       res.send(400, "Send a valid card Id as a parameter");
   } 
});

module.exports = router;

