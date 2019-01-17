const router = require('express').Router()

const User = require ('../models/user');
const Organization = require('../models/organization');
const List = require ('../models/list');
const Board = require ('../models/board');
const Card = require ('../models/card');
const Comment = require ('../models/comment');

router.get('/generate-dummy-data', async (req, res) => {
  //1 organization
  const org1 = new Organization({
    name: 'Project Shift',
    boards: [],
    users: []
  })
  
  //10 users
  const user1 = new User({
    email: 'bob@gmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user2 = new User({
    email: 'joe@aol.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user3 = new User({
    email: 'sue@yahoo.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user4 = new User({
    email: 'mary@hotmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user5 = new User({
    email: 'marvin@gmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user6 = new User({
    email: 'patty@mail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user7 = new User({
    email: 'john@msn.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user8 = new User({
    email: 'tucker@gmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user9 = new User({
    email: 'paul@hotmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  const user10 = new User({
    email: 'eve@gmail.com',
    hash: '',
    salt:'',
    organizations: [org1]
  });

  //3 boards
  const board1 = new Board({
    name: 'Project Reddit',
    lists: [],
    organization: org1
  })

  const board2 = new Board({
    name: 'To-do List',
    lists: [],
    organization: org1
  })

  const board3 = new Board({
    name: 'Hello World',
    lists: [],
    organization: org1
  })

  //6 lists - 2 lists per board
  const list1 = new List({
    name: 'Do the things',
    board: board1,
    cards: [],
    archived: false
  })

  const list2 = new List({
    name: 'Eat snacks',
    board: board1,
    cards: [],
    archived: false
  })
  
  const list3 = new List({
    name: 'Finish things',
    board: board2,
    cards: [],
    archived: false
  })

  const list4 = new List({
    name: 'I am a list',
    board: board2,
    cards: [],
    archived: false
  })

  const list5 = new List({
    name: 'Do ALL the things',
    board: board3,
    cards: [],
    archived: false
  })

  const list6 = new List({
    name: 'Have awesome demos',
    board: board3,
    cards: [],
    archived: false
  })

  //12 cards (2 per list)
  const card1 = new Card({
    title: 'Sample card',
    list: list1,
    label: 'orange',
    description: 'blah blah blah',
    comments: [],
    activity: 'I got moved',
    archived: false
  })

  const card2 = new Card({
    title: 'Test card',
    list: list1,
    label: 'red',
    description: 'Fun things',
    comments: [],
    activity: 'I got updated',
    archived: false
  })

  const card3 = new Card({
    title: 'New card',
    list: list2,
    label: '',
    description: 'test test test',
    comments: [],
    activity: '',
    archived: false
  })

  const card4 = new Card({
    title: 'Lorem ipsum',
    list: list2,
    label: 'yellow',
    description: 'More lorem ipsum',
    comments: [],
    activity: 'Random gibberish',
    archived: false
  })

  const card5 = new Card({
    title: 'Have lunch',
    list: list3,
    label: 'purple',
    description: '',
    comments: [],
    activity: 'Cool things',
    archived: false
  })
  const card6 = new Card({
    title: 'Sample text',
    list: list3,
    label: '#444444',
    description: '',
    comments: [],
    activity: 'I got restored from the archive',
    archived: false
  })
  const card7 = new Card({
    title: 'File things',
    list: list4,
    label: '#29F263',
    description: 'I am a fun task',
    comments: [],
    activity: 'I got updated',
    archived: false
  })
  const card8 = new Card({
    title: 'Organize stuff',
    list: list4,
    label: '#8620E2',
    description: '',
    comments: [],
    activity: 'I got moved',
    archived: false
  })
  const card9 = new Card({
    title: 'Doing things',
    list: list5,
    label: 'FF11FF',
    description: '',
    comments: [],
    activity: 'More things',
    archived: false
  })
  const card10 = new Card({
    title: 'Sample sample sample',
    list: list5,
    label: '#003388',
    description: '',
    comments: [],
    activity: 'I got moved too',
    archived: false
  })
  const card11 = new Card({
    title: 'Card card card card',
    list: list6,
    label: '#A45BBB',
    description: '',
    comments: [],
    activity: '',
    archived: false
  })
  const card12 = new Card({
    title: 'Sampling more things',
    list: list6,
    label: '',
    description: '',
    comments: [],
    activity: '',
    archived: false
  })

  //12 comments (1 per card)
  const comment1 = new Comment({
    text: 'Hello',
    user: user1,
    card: card1
  })

  const comment2 = new Comment({
    text: 'Goodbye',
    user: user2,
    card: card2
  })

  const comment3 = new Comment({
    text: 'Hello back',
    user: user3,
    card: card3
  })

  const comment4 = new Comment({
    text: 'Hi',
    user: user4,
    card: card4
  })

  const comment5 = new Comment({
    text: 'I am a comment',
    user: user5,
    card: card5
  })

  const comment6 = new Comment({
    text: 'I love Project Reddit',
    user: user6,
    card: card6
  })

  const comment7 = new Comment({
    text: 'React is the best',
    user: user7,
    card: card7
  })

  const comment8 = new Comment({
    text: 'Lodash is my favorite!',
    user: user8,
    card: card8
  })

  const comment9 = new Comment({
    text: 'Testing, 1-2-3',
    user: user1,
    card: card9
  })

  const comment10 = new Comment({
    text: 'Some sample text',
    user: user2,
    card: card10
    
  })

  const comment11 = new Comment({
    text: 'More sample text',
    user: user1,
    card: card11
   
  })

  const comment12 = new Comment({
    text: 'Hi there',
    user: user2,
    card: card12

  })

  org1.users.push(user1);
  org1.users.push(user2);
  org1.users.push(user3);
  org1.users.push(user4);
  org1.users.push(user5);
  org1.users.push(user6);
  org1.users.push(user7);
  org1.users.push(user8);
  org1.users.push(user9);
  org1.users.push(user10);
  org1.boards.push(board1);
  org1.boards.push(board2);
  org1.boards.push(board3);
  board1.lists.push(list1);
  board1.lists.push(list2);
  board2.lists.push(list3);
  board2.lists.push(list4);
  board3.lists.push(list5);
  board3.lists.push(list6);

  list1.cards.push(card1);
  list1.cards.push(card2);
  list2.cards.push(card3);
  list2.cards.push(card4);
  list3.cards.push(card5);
  list3.cards.push(card6);

  card1.comments.push(comment1);
  card2.comments.push(comment2);
  card3.comments.push(comment3);
  card4.comments.push(comment4);
  card5.comments.push(comment5);
  card6.comments.push(comment6);
  card7.comments.push(comment7);
  card8.comments.push(comment8);
  card9.comments.push(comment9);
  card10.comments.push(comment10);
  card11.comments.push(comment11);
  card12.comments.push(comment12);

  await org1.save();
  
  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
  await user6.save();
  await user7.save();
  await user8.save();
  await user9.save();
  await user10.save();
  
  await board1.save();
  await board2.save()
  await board3.save();

  await list1.save();
  await list2.save();
  await list3.save();
  await list4.save();
  await list5.save();
  await list6.save();

  await card1.save();
  await card2.save();
  await card3.save();
  await card4.save();
  await card5.save();
  await card6.save();
  await card7.save();
  await card8.save();
  await card9.save();
  await card10.save();
  await card11.save();
  await card12.save();

  await comment1.save();
  await comment2.save();
  await comment3.save();
  await comment4.save();
  await comment5.save();
  await comment6.save();
  await comment7.save();
  await comment8.save();
  await comment9.save();
  await comment10.save();
  await comment11.save();
  await comment12.save();

  await res.end();

})

module.exports = router;