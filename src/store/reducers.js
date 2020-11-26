import { combineReducers } from "redux";
import authorization from './authorization'
import common from './common'
import profile from './profile'
import channels from './channels'

// Front
import Layout from "./layout/reducer";

const rootReducer = combineReducers({
  authorization,
  profile,
  channels,
  common,
  
  Layout,
});

export default rootReducer;
