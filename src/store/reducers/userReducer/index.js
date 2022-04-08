import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  transfer: {
    loading: false,
    error: null,
  },
  authorizing: {
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

    case actions.queueTransferAction.TRIGGER:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: true,
        },
      };
    case actions.queueTransferAction.SUCCESS:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: false,
        },
      };
    case actions.queueTransferAction.FAILURE:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: payload,
        },
      };
    case actions.queueTransferAction.FULFILL:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: null,
        },
      };

    case actions.authorizingAction.TRIGGER:
      return {
        ...state,
        authorizing: {
          ...state.authorizing,
          loading: true,
        },
      };
    case actions.authorizingAction.SUCCESS:
      return {
        ...state,
        authorizing: {
          ...state.authorizing,
          loading: false,
          error: false,
        },
      };
    case actions.authorizingAction.FAILURE:
      return {
        ...state,
        authorizing: {
          ...state.authorizing,
          loading: false,
          error: payload,
        },
      };
    case actions.authorizingAction.FULFILL:
      return {
        ...state,
        authorizing: {
          ...state.authorizing,
          loading: false,
          error: null,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
