import * as actions from "./actionTypes";

export const signIn = (email, password) => async (firebase, dispatch) => {
  try {
    dispatch(actions.signInAction.trigger());
    await firebase.login({
      email,
      password,
    });
    dispatch(actions.signInAction.success());
  } catch (e) {
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

export const signOut = () => async (firebase) => {
  try {
    await firebase.logout();
    window.location.reload();
  } catch (e) {
    console.log(e.message);
  }
};

export const storeFCMKey = (FCMKey, uid) => async (firebase) => {
  try {
    await firebase
      .database()
      .ref("users")
      .child(uid)
      .child("fcmKey")
      .set(FCMKey);
  } catch (e) {
    console.log(e.message);
  }
};
