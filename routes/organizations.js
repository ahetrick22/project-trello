const router = require('express').Router();
const Organization = require('../models/organization');
const Board = require('../models/board');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/api/organizations', requireAuth, (req, res) => {
  
  Organization.findOne({}, (err, organizations) => {
    if(!organizations) {
      return res.send({})
    } else {
    res.send(organizations);
    }
  });
});

//ADD A BOARD TO AN ORGANIZATION
router.post('/api/organizations/:id', requireAuth, (req, res) => {
  //make sure it's a valid mongo ID and won't trigger a cast error
if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  //then find the matching organization
  Organization.findById(req.params.id, (err, organization) => {
    if (err) throw err;
    //if no organization at that id, then tell the user
    if (!organization) {
      return res.send(404, 'No such organization');
    }
      //create a new board
      console.log(req.body);
      if(req.body.name) {
        let newBoard = new Board({
          name: req.body.name,
          lists: [],
          organization: req.params.id
        });

        newBoard.save((err, savedBoard) => {
          organization.boards.push(newBoard);
          organization.save((err, savedOrg) => {
        //populate the organization with its boards and send it
            Organization.findById(savedOrg._id, (err, fullOrganization) =>
            fullOrganization.populate('boards', () => {
              if (err) throw err;
              res.send(JSON.stringify(fullOrganization));
            })
            )
          })
        })
      } else {
        //if object ID isn't in correct format
        res.send(400, 'Send a valid object ID as a parameter');
      }
    })
  }
});

module.exports = router;




