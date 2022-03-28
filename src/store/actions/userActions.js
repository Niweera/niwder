import * as actions from "./actionTypes";
import axios from "axios";
import { API_BASE } from "../../config";

export const megaToGDrive = (url) => async (firebase, dispatch) => {
  try {
    dispatch(actions.megaToGDriveAction.trigger());
    const token = await firebase.auth().currentUser.getIdToken();
    await axios.post(
      `${API_BASE}/api/mega-to-gdrive`,
      {
        url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(actions.megaToGDriveAction.success());
  } catch (e) {
    dispatch(actions.megaToGDriveAction.failure(e.message));
  }
};

export const clearMessages = () => (dispatch) =>
  dispatch(actions.megaToGDriveAction.fulfill());
