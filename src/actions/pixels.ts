import { Tool } from "../components/action-bar";

export const ADD_COLOR: "ADD_COLOR" = "ADD_COLOR";
export const addColor = (hexcode: string) => ({
  type: ADD_COLOR,
  payload: { hexcode },
});
export type AddColorAction = ReturnType<typeof addColor>;

export const SET_TOOL: "SET_TOOL" = "SET_TOOL";
export const setTool = (tool: Tool) => ({
  type: SET_TOOL,
  payload: { tool },
});
export type SetToolAction = ReturnType<typeof setTool>;

export const SET_COLOR: "SET_COLOR" = "SET_COLOR";
export const setColor = (color: string) => ({
  type: SET_COLOR,
  payload: { color },
});
export type SetColorAction = ReturnType<typeof setColor>;

export type PixelsAction = AddColorAction | SetToolAction | SetColorAction;
