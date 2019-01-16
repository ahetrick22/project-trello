export const onDragEnd = result => {

  const { destination, source, draggableId, type } = result;

  // User drops draggable into an area that is not a droppable
  if (!destination) {
    return;
  }

  // User drops draggable into the same exact position
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (type === 'column') {
    const newListOrder = Array.from(this.state.listOrder);
    newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, draggableId);

    const newState = {
      ...this.state,
      listOrder: newListOrder,
    };

    this.setState(newState);
    return;
  }

  const startList = this.state.lists[source.droppableId];
  const finishList = this.state.lists[destination.droppableId];

  // Moving positions within the list
  if (startList === finishList) {
    const newCardIds = Array.from(startList.cardIds);
    // remove the card from the card id list from where it was removed
    newCardIds.splice(source.index, 1);
    // insert the card into the card id list
    newCardIds.splice(destination.index, 0, draggableId);

    const newList = {
      ...startList,
      cardIds: newCardIds,
    };

    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newList.id]: newList,
      }
    };

    this.setState(newState);
    return;
  }

  // Moving from one list to another
  const startCardIds = Array.from(startList.cardIds);
  startCardIds.splice(source.index, 1);
  const newStart = {
    ...startList,
    cardIds: startCardIds,
  };

  const finishCardIds = Array.from(finishList.cardIds);
  finishCardIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finishList,
    cardIds: finishCardIds,
  };

  const newState = {
    ...this.state,
    lists: {
      ...this.state.lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  this.setState(newState);

  // call server endpoint to let know that a reorder has occurred

}