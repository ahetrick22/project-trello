import { FETCH_CARD_INFO } from '../Actions/types';
/*=====================================================
This reducer handles all the information for a given card,
all comments, logs, etc. Will have to make a new call to the
server most likely for every modal that pops up.
=====================================================*/
export const cardReducer = (state = {}, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_CARD_INFO:
    let {data, id} = payload
    console.log('data in reducer',data);
    let allCards = data.lists.map(lists => lists.cards).flat()
    let selected = allCards.find(cards => cards._id === id)
    data.selected = selected;
    //console.log('in card reducer', selected)
      return { ...data };
    default:
      return state;
  }
};
