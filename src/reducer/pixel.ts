import {
  ADD_COLOR,
  PixelsAction,
  SET_COLOR,
  SET_DIMENSION,
  SET_TOOL,
} from "../actions/pixels";
import { Tool } from "../components/action-bar/action-bar";

export interface PixelRootState {
  colors: string[];
  tool: Tool;
  color: string | undefined;
  dimension: number;
}

const defaultState = {
  colors: ["test"],
  tool: Tool.PENCIL,
  color: "#000000",
  dimension: 16,
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
    case SET_DIMENSION: {
      return { ...state, dimension: action.payload.dimension };
    }
    default:
      return state;
  }
};

export default pixel;
