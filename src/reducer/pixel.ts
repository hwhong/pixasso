import {
  ADD_COLOR,
  PixelsAction,
  SET_COLOR,
  SET_DIMENSION,
  SET_TOOL,
} from "../actions/pixels";
import { Tool } from "../components/action-bar/action-bar";
import { sortedDefaults } from "../helper/colors";
import { Dimension } from "../helper/dimension";

export interface PixelRootState {
  palette: string[];
  tool: Tool;
  color: string | undefined;
  dimension: Dimension;
}

const defaultState: PixelRootState = {
  palette: [...sortedDefaults],
  tool: Tool.PENCIL,
  color: "#000000",
  dimension: 32,
};

const pixel = (
  state: PixelRootState = defaultState,
  action: PixelsAction
): PixelRootState => {
  switch (action.type) {
    case ADD_COLOR: {
      return { ...state, palette: [...state.palette, action.payload.hexcode] };
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
