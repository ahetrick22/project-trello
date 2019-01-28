import { FETCH_CARD_INFO, ADD_COMMENT } from '../Actions/types';
/*=====================================================
This reducer handles all the information for a given card,
all comments, logs, etc. Will have to make a new call to the
server most likely for every modal that pops up.
=====================================================*/
export const cardReducer = (state = {}, action) => {
  let { payload, type } = action; //destructuring

  switch (type) {
    case FETCH_CARD_INFO:
      let { data, id } = payload;
      let allCards = data.lists.map(lists => lists.cards).flat();
      let selected = allCards.find(cards => cards._id === id);
      // let filteredData = data.lists.map(list => {
      //   return list.cards.filter(card => card.archived === false);
      // });
      // data.lists = filteredData;
      data.selected = selected;
      console.log('data', data);
      //console.log('in card reducer', selected)
      // return state;
      return { ...data };
    case ADD_COMMENT:
      console.log('at card reducer. payload is: ', payload);
      return { ...state, ...payload };
    default:
      return state;
  }
};
