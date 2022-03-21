import { ADD_COLOR, PixelsAction, SET_TOOL } from "../actions/pixels";
import { Tool } from "../components/action-bar";

export interface PixelRootState {
  colors: string[];
  currentTool: Tool;
}

const defaultState = {
  colors: ["test"],
  currentTool: Tool.PENCIL,
};

const pixel = (
  state: PixelRootState = defaultState,
  action: PixelsAction
): PixelRootState => {
  switch (action.type) {
    case ADD_COLOR: {
      return { ...state, colors: [...state.colors, action.payload.hexcode] };
    }
    case SET_TOOL: {
      return { ...state, currentTool: action.payload.tool };
    }
    default:
      return state;
  }
};

export default pixel;
