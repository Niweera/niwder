import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  transfer: {
    loading: false,
    error: null,
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.signInAction.TRIGGER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.signInAction.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.signInAction.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actions.megaToGDriveAction.TRIGGER:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: true,
        },
      };
    case actions.megaToGDriveAction.SUCCESS:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: false,
        },
      };
    case actions.megaToGDriveAction.FAILURE:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: payload,
        },
      };

    case actions.megaToGDriveAction.FULFILL:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: null,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
