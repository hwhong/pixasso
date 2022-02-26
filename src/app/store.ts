import pixelsReducers from "../reducer/pixel";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  pixel: pixelsReducers,
});

export type StateType = ReturnType<typeof rootReducer>;
export default createStore(rootReducer);
