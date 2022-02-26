import { ADD_COLOR, PixelsAction } from "../actions/pixels";

export interface RootState {
  colors: string[];
}

const defaultState = {
  colors: ["test"],
};

const pixelsReducers = (
  state: RootState = defaultState,
  action: PixelsAction
): RootState => {
  switch (action.type) {
    case ADD_COLOR: {
      return { ...state };
    }

    default:
      return state;
  }
};

export default pixelsReducers;
