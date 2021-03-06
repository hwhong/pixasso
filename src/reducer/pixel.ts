import {
  ADD_COLOR,
  DELETE_COLOR,
  PixelsAction,
  SET_COLOR,
  SET_DIMENSION,
  SET_TOOL,
} from "../actions/pixels";
import { Tool } from "../components/action-bar/action-bar";
import { LOCAL_STORAGE_KEY, sortedDefaults } from "../helper/colors";
import { Dimension } from "../helper/dimension";

export interface PixelRootState {
  // [platform defaults, user defaults]
  palette: [string[], string[]];
  tool: Tool;
  color: string | undefined;
  dimension: Dimension;
}

let userColorsStr = localStorage.getItem(LOCAL_STORAGE_KEY);
const userColors = userColorsStr?.split(";").map((c) => c.replace(/\s/g, ""));

const defaultState: PixelRootState = {
  palette: [sortedDefaults, userColors ?? []],
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
      let newUserColors = localStorage
        .getItem(LOCAL_STORAGE_KEY)
        ?.split(";")
        .map((c) => c.replace(/\s/g, ""));

      return { ...state, palette: [sortedDefaults, newUserColors ?? []] };
    }
    case DELETE_COLOR: {
      let colors = localStorage
        .getItem(LOCAL_STORAGE_KEY)
        ?.split(";")
        .map((c) => c.replace(/\s/g, ""));

      const newColors = colors?.filter((c) => c !== action.payload.color);

      localStorage.setItem(LOCAL_STORAGE_KEY, newColors?.join(";")!);

      return { ...state, palette: [sortedDefaults, newColors!] };
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
