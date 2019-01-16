const router = require('express').Router();
const Organization = require('../models/organization');
const Board = require('../models/board');

router.get('/organizations', (req, res) => {
  Organization.find({}, (err, organizations) => {
    if (err) throw err;
    res.send(JSON.stringify(organizations));
  });
});

//add a board to an org
router.post('/organizations/:id/board', (req, res) => {
  //make sure it's a valid mongo ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching organization
    Organization.findById(req.params.id, (err, organization) => {
      if (err) throw err;
      //if no organization at that id, then tell the user
      if (!organization) {
        res.send(404, 'No board with that id');

        //otherwise, create the new list on that board and send it

      } else {
        let newBoard = new Board({
          name: req.body.name,
          lists: [],
          organization: req.body.id
        });

        newBoard.save((err, id) => {
          if (err) return err;
          let refnId = id;

          Organization.findById(refnId, (err, newList) => {
            if (err) throw err;
            organization.boards.push(newBoard);
            organization.save();
          })
        })

        Organization.findById(req.params.id).populate({
          path: 'boards',
          populate: {
            path: 'users'
          }
        }).exec((err, organziationView) => {
          if (err) throw err;
          organziationView.boards.push(newBoard);
          res.send(JSON.stringify(organziationView));
        })
      }

    })

    //if the object ID wasn't in the correct format
  } else {
    res.send(400, 'Send a valid object ID as a parameter');
  }
})

module.exports = router;