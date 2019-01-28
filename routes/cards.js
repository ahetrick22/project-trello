const router = require('express').Router();
const Card = require('../models/card');
const User = require('../models/user');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const List = require('../models/list');
const Board = require('../models/board');
const Comment = require('../models/comment');

router.get('/api/card/:id', requireAuth, (req, res) => {
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
                match: { archived: false }, //chain here filtering so that archived things don't return
                populate: {
                  path: 'comments',
                  populate: {
                    path: 'user'
                  }
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

router.put('/api/card/:id', requireAuth, (req, res) => {
  //check to see which params come in the body
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let activityObj = {};
    let updateObject = {};

    User.findOne({ email: req.headers.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.send(404, 'No user with that id');
      } else {
        activityObj.user = user._id;
        activityObj.text = user.email;
        activityObj.timestamp = new Date();

        if (req.body.title) {
          updateObject.title = req.body.title;
          activityObj.text += ` changed the title to ${req.body.title}.`;
        }

        if (req.body.label) {
          updateObject.label = req.body.label;
          activityObj.text += ` changed the label to ${req.body.label}.`;
        }

        if (req.body.description) {
          updateObject.description = req.body.description;
          activityObj.text += ' updated the description.';
        }

        if (req.body.archived) {
          updateObject.archived = req.body.archived;
          if (req.body.archived === true) {
            activityObj.text += ' archived the card.';
          }
          activityObj.text += ' unarchived the card.';
        }
        if (req.body.list) {
          updateObject.list = req.body.list;
          activityObj.text += ` moved this card to ${req.body.list}.`;
        }
        if (Object.keys(updateObject).length === 0) {
          return res.send(400, 'Body must have parameters matching parameters');
        }
        let { id } = req.params;
        Card.findByIdAndUpdate(id, updateObject, (err, card) => {
          if (err) throw err;
          card.activity.push(activityObj);
          card.save();
          if (!card) {
            return res.send(404, 'no card with that id');
          } else {
            List.findById(card.list._id, (err, fullList) => {
              Board.findById(fullList.board._id)
                .populate({
                  path: 'lists',
                  populate: {
                    path: 'cards',
                    match: { archived: false }, //chain here filtering so that archived things don't return
                    populate: {
                      path: 'comments',
                      populate: {
                        path: 'user'
                      }
                    }
                  }
                })
                .exec((err, fullBoard) => {
                  if (err) throw err;
                  res.send(fullBoard);
                });
            });
          }
        });
      }
    });
  } else {
    return res.send(400, 'Send a valid object ID as a parameter');
  }
});

router.post('/api/card/:id/comment', (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let activityObj = {};
    //then find the matching card
    Card.findById(req.params.id, (err, card) => {
      if (err) throw err;
      //tells user if no card with that id
      if (!card) {
        res.send(404, 'No such card');
      } else {
        User.findOne({ email: req.headers.email }, (err, user) => {
          if (err) throw err;
          let newComment = new Comment({
            user: user,
            text: req.body.text,
            card: req.params.id
          });
          activityObj.user = user._id;
          activityObj.text = user.email + ` commented ${newComment.text}`;
          activityObj.timestamp = new Date();
          newComment.save((err, savedComment) => {
            if (err) throw err;
            let commentId = savedComment._id;
            Comment.findById(commentId, (err, newComment) => {
              if (err) throw err;
              card.comments.push(newComment);
              card.activity.push(activityObj);
              card.save();
              if (!card) {
                return res.send(404, 'no card with that id');
              } else {
                List.findById(card.list._id, (err, fullList) => {
                  Board.findById(fullList.board._id)
                    .populate({
                      path: 'lists',
                      populate: {
                        path: 'cards',
                        match: { archived: false }, //chain here filtering so that archived things don't return
                        populate: {
                          path: 'comments',
                          populate: {
                            path: 'user'
                          }
                        }
                      }
                    })
                    .exec((err, fullBoard) => {
                      if (err) throw err;
                      res.send(fullBoard);
                    });
                });
              }
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
