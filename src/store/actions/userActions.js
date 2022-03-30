import * as actions from "./actionTypes";
import axios from "axios";
import { API_BASE } from "../../config";

export const megaToGDrive = (url) => async (firebase, dispatch) => {
  try {
    dispatch(actions.queueTransferAction.trigger());
    const token = await firebase.auth().currentUser.getIdToken();
    await axios.post(
      `${API_BASE}/api/mega-to-gdrive`,
      {
        url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(actions.queueTransferAction.success());
  } catch (e) {
    dispatch(actions.queueTransferAction.failure(e.message));
  }
};

export const gDriveToMega = (url) => async (firebase, dispatch) => {
  try {
    dispatch(actions.queueTransferAction.trigger());
    const token = await firebase.auth().currentUser.getIdToken();
    await axios.post(
      `${API_BASE}/api/gdrive-to-mega`,
      {
        url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(actions.queueTransferAction.success());
  } catch (e) {
    dispatch(actions.queueTransferAction.failure(e.message));
  }
};

export const checkAPIAlive = () => async (firebase) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      await axios.get(`${API_BASE}/api`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      resolve();
    } catch (e) {
      reject();
    }
  });
};

export const clearMessages = () => (dispatch) =>
  dispatch(actions.queueTransferAction.fulfill());
