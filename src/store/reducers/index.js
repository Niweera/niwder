import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  userData: userReducer,
});

export default rootReducer;
