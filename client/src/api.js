import openSocket from 'socket.io-client';
const socket = openSocket();

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

const updateSameList = (socketObj, newState) => {
  socket.emit('updateSameList', { socketObj, newState });
};

const updateDifferentList = (socketObj, newState) => {
  socket.emit('updateDifferentList', { socketObj, newState });
};

const newListOrderEvent = (socketObj, newState) => {
  socket.emit('updateListPosition', { socketObj, newState })
}

const updatedList = self => {
  socket.on('updatedList', newState => {
    self.setState(newState);
  });
};

export { updateSameList, updateDifferentList, updatedList, newListOrderEvent };
