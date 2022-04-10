import { createStore, compose } from "redux";
import rootReducer from "./reducers";
import firebase from "../config";
import { get } from "lodash";

const profileFactory = (userData, profileData, firebase) => {
  return {
    uid: get(userData, "uid", ""),
    google: false,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  };
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: false,
  attachAuthIsReady: true,
  useFirestoreForStorageMeta: false,
  profileFactory,
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
