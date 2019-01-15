const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const Card = require('../models/card');

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
            
module.exports = router;
