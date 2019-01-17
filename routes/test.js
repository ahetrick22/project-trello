
// router.post('/organizations/:id', (req, res) => {
//     //make sure it's a valid mongo ID and won't trigger a cast error

//   if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//     //then find the matching organization
//     Organization.findById(req.params.id, (err, organization) => {
//       if (err) throw err;

//       //if no organization at that id, then tell the user
//       if (!organization) {
//         return res.send(404, 'No such organization');

//         //create a new board
//       }
//         console.log(req.body)
//         if (req.body.name) {
//           let newBoard = new Board({
//             name: req.body.name,
//             lists: [],
//             organization: req.params.id
//           })
//           
//             
//                 )
//               })
//             })
//         res.send(404, "Body must have parameters matching parameters");
//         //if the object ID wasn't in the correct format
//         })
//       } else {
//         res.send(400, 'Send a valid object ID as a parameter');
//       }
// })//     } else {
//       console.log(req.body)
//       
      
//       newBoard.save();
//       organization.boards.push(newBoard);
//       organization.save((err, savedOrg) => {
//         //populate the organization with its boards and send it
//         Organization.findById(savedOrg._id, (err, fullOrganization) =>
//           fullOrganization.populate('boards', () => {
//             if (err) throw err;
//             res.send(JSON.stringify(fullOrganization));
//           })
//         )
//       });

//     }
//   })
//   //if the object ID wasn't in the correct format
// } else {
// res.send(400, 'Send a valid object ID as a parameter');
// }
// })

//otherwise, create the new list on that board and send it


