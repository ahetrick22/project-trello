import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { cardReducer } from './cardReducer';
import { orgReducer } from './orgReducer';

const rootReducer = combineReducers({
  loggedInOrganization: orgReducer,
  selectedBoard: boardReducer,
  selectedCard: cardReducer,
  user: userReducer
});

export default rootReducer;
