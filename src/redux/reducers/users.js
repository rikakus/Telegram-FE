import {
  GET_LIST_USERS_PENDING,
  GET_LIST_USERS_SUCCESS,
  GET_LIST_USERS_FAILED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const listUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        error: null,
      };
    case GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        error: null,
      };
    case GET_LIST_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listUsersReducer;
