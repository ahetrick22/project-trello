const router = require('express').Router();
const Organization = require('../models/organization');

router.get('/organizations', (req, res) => {
  Organization.find({}, (err, organizations) => {
    if (err) throw err;
    res.send(JSON.stringify(organizations));
  });
});


module.exports = router;