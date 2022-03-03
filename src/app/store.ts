import pixel from "../reducer/pixel";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  pixel,
});

export type StateType = ReturnType<typeof rootReducer>;
export default createStore(rootReducer, composeWithDevTools());
