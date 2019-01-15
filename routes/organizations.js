const router = require('express').Router();
const Organization = require('../models/organization');

router.get('/organizations', (req, res) => {
  Organization.find({}, (err, organizations) => {
    if (err) throw err;
    res.send(JSON.stringify(organizations));
  });
});


//ADD A BOARD TO AN ORGANIZATION

// POST organization /: organizationId / board - add a new board to the organization
// Params: organizationId
// ReqBody: { Name: String }
// Res: Updated Organization with populated boards
//   - { Name: String, board: [boards] }

router.post('organizations/:organizationId/board', (req, res) => {
  //make sure it's a valid mongo ID and won't trigger a cast error
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching organization
    Organization.findById(req.params.id, (err, organization) => {
      if (err) throw err;

      //if no organization at that id, then tell the user
      if (!organization) {
        res.send(404, 'No such organization');

        //create a new board
      } else {
        let newBoard = new Board({
          name: req.body.name,
          lists: [],
          organization: req.body.id
        });

        newBoard.save();
        Organization.boards.push(newBoard);
        Organization.save();

        //populate the organization with its boards and send it
        Organization.findById(req.params.id, (err, fullOrganization) =>
          fullOrganization.populate('boards', () => {
            if (err) throw err;
            res.send(JSON.stringify(fullCard));
          })
        )
      }

    })
    //if the object ID wasn't in the correct format
  } else {
  res.send(400, 'Send a valid object ID as a parameter');
}
})


module.exports = router;