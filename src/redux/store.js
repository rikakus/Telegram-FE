/* eslint-disable no-undef */
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import promiseMiddleware from "redux-promise-middleware";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const middleware = applyMiddleware(thunk);
//   const store = createStore(persistedReducer, middleware);

const store = createStore(persistedReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export { store, persistor };
