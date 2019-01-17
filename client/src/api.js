import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:7000');


function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

const updateSameList = (socketObj) => {
  socket.emit('updateSameList', socketObj);
  
}

const updateDifferentList = (socketObj) => {
  socket.emit('updateDifferentList', socketObj);
}

const updatedList = (self) => {
  socket.on('updatedList', () => {
    
    console.log('updating');
  })
}

export { updateSameList, updateDifferentList, updatedList };
