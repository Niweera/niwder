import * as actions from "./actionTypes";
import { perfmon } from "../../config";
import FingerPrintJS from "@fingerprintjs/fingerprintjs";

export const signIn = (email, password) => async (firebase, dispatch) => {
  const trace = perfmon.trace("signIn");
  trace.start();
  try {
    dispatch(actions.signInAction.trigger());
    await firebase.login({
      email,
      password,
    });
    dispatch(actions.signInAction.success());
    trace.stop();
  } catch (e) {
    trace.stop();
    switch (e.code) {
      case "auth/wrong-password": {
        return dispatch(
          actions.signInAction.failure("Password does not match")
        );
      }
      case "auth/user-not-found": {
        return dispatch(actions.signInAction.failure("User does not exist"));
      }
      default: {
        return dispatch(
          actions.signInAction.failure("Login error, please try again later")
        );
      }
    }
  }
};

export const signInWithProviderID =
  (provider) => async (firebase, dispatch) => {
    const trace = perfmon.trace("signInWithProviderID");
    trace.start();
    try {
      dispatch(actions.signInAction.trigger());
      await firebase.login({
        provider,
        type: "popup",
        scopes: [""],
      });
      dispatch(actions.signInAction.success());
      trace.stop();
    } catch (e) {
      trace.stop();
      dispatch(actions.signInAction.failure(e.message));
    }
  };

export const signOut = () => async (firebase) => {
  const trace = perfmon.trace("signOut");
  trace.start();
  try {
    await firebase.logout();
    trace.stop();
    window.location.reload();
  } catch (e) {
    trace.stop();
    console.log(e.message);
  }
};

export const storeFCMKey = (FCMKey, uid) => async (firebase) => {
  const trace = perfmon.trace("storeFCMKey");
  trace.start();
  try {
    const fingerPrintJS = await FingerPrintJS.load();
    const fingerPrint = await fingerPrintJS.get();
    await firebase
      .database()
      .ref("fcmKeys")
      .child(uid)
      .child(fingerPrint.visitorId)
      .set(FCMKey);
    trace.stop();
  } catch (e) {
    trace.stop();
    console.log(e.message);
  }
};
