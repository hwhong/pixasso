export const DEFAULT_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FC1620",
  "#CAA472",
  "#126DE7",
  "#80a1d4",
  "#2ab7ca",
  "#ccfbfe",
  "#a5243d",
  "#e2e8dd",
  "#bc8da7",
  "#d4d4d4",
  "#2b303a",
  "#8f9491",
  "#f5d3c8",
  "#FCCC0A",
  "#7FE4EF",
  "#2DD684",
  "#ffc8dd",
  "#74c69d",
  "#3d405b",
  "#540b0e",
  "#ffd60a",
  "#0081a7",
  "#ffee32",
  "#00cecb",
  "#bbc7a4",
  "#fb3640",
  "#016fb9",
  "#e5e9ec",
  "#efc88b",
  "#4ecdc4",
];

interface ColorObject {
  hue: number;
  hex: string;
}

const constructColor = (hexString: string): ColorObject => {
  const hex = hexString.replace(/#/g, "");
  /* Get the RGB values to calculate the Hue. */
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  /* Getting the Max and Min values for Chroma. */
  const max = Math.max.apply(Math, [r, g, b]);
  const min = Math.min.apply(Math, [r, g, b]);

  /* Variables for HSV value of hex color. */
  let chr = max - min;
  let hue = 0;
  let val = max;
  let sat = 0;

  if (val > 0) {
    /* Calculate Saturation only if Value isn't 0. */
    sat = chr / val;
    if (sat > 0) {
      if (r === max) {
        hue = 60 * ((g - min - (b - min)) / chr);
        if (hue < 0) {
          hue += 360;
        }
      } else if (g === max) {
        hue = 120 + 60 * ((b - min - (r - min)) / chr);
      } else if (b === max) {
        hue = 240 + 60 * ((r - min - (g - min)) / chr);
      }
    }
  }
  const colorObj: ColorObject = { hex: "#000000", hue: 0 };
  colorObj.hue = hue;
  colorObj.hex = hexString;
  return colorObj;
};

export const sortColorsByHue = (colors: string[]): string[] => {
  return colors
    .map((color) => constructColor(color))
    .sort((a, b) => {
      if (a.hue && b.hue) {
        return a.hue - b.hue;
      }
      return 1;
    })
    .map((color) => color.hex);
};

export const sortedDefaults = sortColorsByHue(DEFAULT_COLORS);
