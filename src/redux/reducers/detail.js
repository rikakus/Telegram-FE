import {
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const detailUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        error: null,
      };
    case GET_DETAIL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        error: null,
      };
    case GET_DETAIL_USER_FAILED:
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

export default detailUsersReducer;
