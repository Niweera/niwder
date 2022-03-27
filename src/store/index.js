import { createStore, compose } from "redux";
import rootReducer from "./reducers";
import firebase from "../config";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: false,
  attachAuthIsReady: true,
  useFirestoreForStorageMeta: false,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhancers());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export default store;
