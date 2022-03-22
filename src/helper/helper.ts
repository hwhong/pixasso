import { MetaLayer } from "../type/type";

export const DIVIDER = "/";

export function initGrid(): MetaLayer[][] {
  const grid: MetaLayer[][] = [];
  Array.from(Array(10).keys()).forEach((row) => {
    let arr: MetaLayer[] = [];
    Array.from(Array(10).keys()).forEach((col) => {
      arr.push({ index: `${row}${DIVIDER}${col}`, filled: false });
    });
    grid.push(arr);
  });
  return grid;
}

export function initVisited(): boolean[][] {
  const grid: boolean[][] = [];
  Array.from(Array(10).keys()).forEach((y) => {
    let arr: boolean[] = [];
    Array.from(Array(10).keys()).forEach((x) => {
      arr.push(false);
    });
    grid.push(arr);
  });
  return grid;
}

export function calculateArea(
  grid: MetaLayer[][],
  col: number,
  row: number,
  visisted: boolean[][]
): string[] {
  let unfilledArea: string[] = [];

  if (
    col < 0 ||
    row < 0 ||
    col > grid.length - 1 ||
    row > grid.length - 1 ||
    grid[row][col].filled ||
    visisted[row][col]
  ) {
    return unfilledArea;
  }
  visisted[row][col] = true;

  const area1 = calculateArea(grid, col + 1, row, visisted);
  const area2 = calculateArea(grid, col - 1, row, visisted);
  const area3 = calculateArea(grid, col, row + 1, visisted);
  const area4 = calculateArea(grid, col, row - 1, visisted);
  let current: string[] = [];
  if (!grid[row][col].filled) {
    current = [grid[row][col].index];
  }

  return unfilledArea.concat([
    ...current,
    ...area1,
    ...area2,
    ...area3,
    ...area4,
  ]);
}
