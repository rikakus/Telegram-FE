import { combineReducers } from "redux";
import detailUsersReducer from "./detail";
import listUsersReducer from "./users";

export default combineReducers({
  listUser: listUsersReducer,
  detailUser: detailUsersReducer,
});
