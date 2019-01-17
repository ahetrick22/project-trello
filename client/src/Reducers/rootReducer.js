import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { cardReducer } from './cardReducer';
import { orgReducer } from './orgReducer';
//import { userReducer } from './loginReducer';
import { boardsReducer } from './boardsReducer';
//import { listReducer } from './listReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  organization: orgReducer,
  boards: boardsReducer,
  // board: boardReducer,
  // lists: listReducer,
  // card: cardReducer,
  // loggedInOrganization: orgReducer,
  selectedBoard: boardReducer,
  selectedCard: cardReducer,
  user: loginReducer
});

export default rootReducer;
