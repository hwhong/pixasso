import {
  ADD_COLOR,
  PixelsAction,
  SET_COLOR,
  SET_TOOL,
} from "../actions/pixels";
import { Tool } from "../components/action-bar";

export interface PixelRootState {
  colors: string[];
  tool: Tool;
  color: string;
}

const defaultState = {
  colors: ["test"],
  tool: Tool.PENCIL,
  color: "#000000",
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
      return { ...state, tool: action.payload.tool };
    }
    case SET_COLOR: {
      return { ...state, color: action.payload.color };
    }
    default:
      return state;
  }
};

export default pixel;
