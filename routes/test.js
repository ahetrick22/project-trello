//step 1: find card. error validation
//find by id after finding card. inside that callback create new comment, push it into cards comments array.
//inside the same callback, find card again, populate comments, return that card


//const { cardId } = req.params;
//     const { text } = req.body;

//     //create your comment
//     Comment.create({text}, (err, comment) => {
//         if (err) {
//             res.status(404, "You must enter a valid username or password");
//         }
//     });
        
// //find the card where the comment goes to based on that card
//         Card.findById(cardId, (err, card) => {
//             if (err) {
//                 res.status(404, "Cannot find card with that id");
//             } else {
//                 Card.findById(cardId).populate({
//                     path: 'comments'
//                 }).exec((err, card) => {
//                     if(err) throw err;
//                     card.comments.push(comment);
//                     res.send(JSON.stringify(card));
//                 })
//             }
//         })
//     })
// })

