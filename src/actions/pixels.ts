export const ADD_COLOR: "ADD_COLOR" = "ADD_COLOR";
export const addColor = (hexcode: string) => ({
  type: ADD_COLOR,
  payload: { hexcode },
});
export type AddColorAction = ReturnType<typeof addColor>;

export type PixelsAction = AddColorAction;
