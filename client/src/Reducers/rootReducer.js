import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { cardReducer } from './cardReducer';
import { orgReducer } from './orgReducer';
import { loginReducer as userReducer } from './loginReducer'

const rootReducer = combineReducers({
  organization: orgReducer,
  boards: boardsReducer,
  board: boardReducer,
  lists: listReducer,
  card: cardReducer
  loggedInOrganization: orgReducer,
  selectedBoard: boardReducer,
  selectedCard: cardReducer,
  user: userReducer
});

export default rootReducer;
