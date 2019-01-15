const router = require('express').Router();
const bodyParser = require('body-parser');
const Card = require('../models/cards');

router.post('/card/:id', (req, res) => {
    let {cardId} = req.params.card;
    Card.findById(req.params.card)
    .exec((err, product) => {
        let newCard = new Card({
            title: "Test",
            list: "",
            label: "Blue",
            description: "route test",
            comments: [],
            activity: []
        });

        newCard.save();
        res.send('Success'):
    })
    // const { title } = req.params;
    // const card = findObject(title, card);
    // if (!card) {
    //     res.writeHead(404, "That card does not exist");
    //     return res.end();
    // }
    // res.writeHead(200, {"Content-Type": "application/json"});
    // return res.end();
})

modules.export = router;
