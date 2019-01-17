const router = require('express').Router();
const Card = require('../models/card');
const List = require('../models/list');
const Board = require('../models/board');

const User = require('../models/user')
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/card/:id', (req, res) => {
  //make sure it's a valid ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching card
    Card.findById(req.params.id, (err, card) => {
      if (err) throw err;
      //if no card at that id, then tell the user
      if (!card) {
        res.send(404, 'No card with that id');
        //otherwise, populate the card with its comments and send it
      } else {
        List.findById(card.list._id, (err, fullList) => {
          Board.findById(fullList.board._id)
            .populate({
              path: 'lists',
              populate: {
                path: 'cards',
                populate: {
                  path: 'comments'
                }
              }
            })
            .exec((err, fullBoard) => {
              if (err) throw err;
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
// router.get('/card/:id', (req, res) => {

//    //make sure it's a valid ID and won't trigger a cast error
//    console.log('card route');
//    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {

//     //then find the matching card
//     Card.findById(req.params.id, (err, card) => {
//       if (err) throw err;
//       //if no card at that id, then tell the user
//       if (!card) {
//         res.send(404, 'No card with that id');
//         //otherwise, populate the card with its comments and send it
//       } else {
//         Card.findById(req.params.id, (err, fullCard) =>
//           fullCard.populate('comments', () => {
//             if (err) throw err;
//             res.send(JSON.stringify(fullCard));
//           })
//         );
//       }
//     });
//     //if the object ID wasn't in the correct format
//   } else {
//     res.send(400, 'Send a valid object ID as a parameter');
//   }
// });

router.put('/card/:id', (req, res) => {
  //check to see which params come in the body
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    User.find({email : req.headers.email}, (err, user) => {
        if (err) throw err;
        let activityObj = {
            user: user._id,
            text: `${user.email} `,
            timestamp: new Date()
        };
    })

      let updateObject = {};
      if(req.body.title) {
          updateObject.title = req.body.title;
          activityObj.text += `changed the title to ${req.body.title}`
      }

      if (req.body.label) {
          updateObject.label = req.body.label;
          activityObj.text += `changed the label to ${req.body.label}`
      }

      if (req.body.description) {
          updateObject.description = req.body.description;
          activityObj.text += 'changed the description'
      }

      if (req.body.archived) {
        updateObject.archived = req.body.archived;
        activityObj.text += 'archived the post'
      }

      if (req.body.list) {
          updateObject.list = req.body.list;
          activityObj.text += `moved this card to ${req.body.list}`
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
              card.activity.push(activityObj);
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
  });

router.post('/card/:id/comment', (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching card
    Card.findById(req.params.id, (err, card) => {
      if (err) throw err;
      //tells user if no card with that id
      if (!card) {
        res.send(404, 'No such card');
      } else {
        User.find({ email: req.headers.email }, (err, user) => {
          if (err) throw err;
          let newComment = new Comment({
            user: user,
            text: req.body.text,
            card: req.params.id
          });
          newComment.save((err, savedComment) => {
            if (err) throw err;
            let commentId = savedComment._id;
            Comment.findById(commentId, (err, newComment) => {
              if (err) throw err;
              card.comments.push(newComment);
              card.save(function(err, card) {
                if (err) throw err;
                Card.findById(req.params.id)
                  .populate({
                    path: 'comments'
                  })
                  .exec((err, fullCard) => {
                    if (err) throw err;
                    res.send(JSON.stringify(fullCard));
                  });
              });
            });
          });
        });
      }
    });
  } else {
    res.send(400, 'Send a valid card Id as a parameter');
  }
});

module.exports = router;
