import { ADD_COLOR, PixelsAction } from "../actions/pixels";

export interface PixelRootState {
  colors: string[];
}

const defaultState = {
  colors: ["test"],
};

const pixel = (
  state: PixelRootState = defaultState,
  action: PixelsAction
): PixelRootState => {
  switch (action.type) {
    case ADD_COLOR: {
      return { ...state, colors: [...state.colors, action.payload.hexcode] };
    }
    default:
      return state;
  }
};

export default pixel;
