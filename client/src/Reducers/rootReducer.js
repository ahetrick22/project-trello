import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { cardReducer } from './cardReducer';
import { orgReducer } from './orgReducer';
import { listReducer } from './listReducer';
import { boardsReducer } from './boardsReducer';

const rootReducer = combineReducers({
  organization: orgReducer,
  boards: boardsReducer,
  board: boardReducer,
  lists: listReducer,
  card: cardReducer
});

export default rootReducer;
