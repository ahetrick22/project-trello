import { combineReducers } from "redux";
import {boardReducer} from './boardReducer';
import {cardReducer} from './cardReducer';
import {orgReducer} from './orgReducer';
import {listReducer} from "./listReducer";


const rootReducer = combineReducers({
  organization:orgReducer,
  board:boardReducer,
  list:listReducer,
  card:cardReducer
});

export default rootReducer;
