const router = require('express').Router();
const Organization = require('../models/organization');

router.get('/organizations', (req, res) => {
  Organization.find({}, (err, organizations) => {
    if (err) throw err;
    res.send(JSON.stringify(organizations));
  });
});

//add a board to an org
router.post('/organizations/:orgId/board', (req, res) => {
  res.send('org Id route');
})

module.exports = router;