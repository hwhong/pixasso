import { GridItemData } from "../type/type";

export const DIVIDER = "/";
export const CANVAS_SIZE = 640;

export function initializeGrid(dimension: number): GridItemData[][] {
  const grid: GridItemData[][] = [];
  Array.from(Array(dimension).keys()).forEach((row) => {
    let arr: GridItemData[] = [];
    Array.from(Array(dimension).keys()).forEach((col) => {
      arr.push({ index: `${row}${DIVIDER}${col}`, color: undefined });
    });
    grid.push(arr);
  });
  return grid;
}

export function makeVisitedGrid(dimension: number): boolean[][] {
  const grid: boolean[][] = [];
  Array.from(Array(dimension).keys()).forEach((y) => {
    let arr: boolean[] = [];
    Array.from(Array(dimension).keys()).forEach((x) => {
      arr.push(false);
    });
    grid.push(arr);
  });
  return grid;
}

export function calculateArea(
  grid: GridItemData[][],
  col: number,
  row: number,
  visited: boolean[][],
  overrideColor: string | undefined
): string[] {
  let unfilledArea: string[] = [];

  if (
    col < 0 ||
    row < 0 ||
    col > grid.length - 1 ||
    row > grid.length - 1 ||
    (grid[row][col].color === undefined && overrideColor !== undefined) ||
    grid[row][col].color !== overrideColor ||
    visited[row][col]
  ) {
    return unfilledArea;
  }

  visited[row][col] = true;

  const area1 = calculateArea(grid, col + 1, row, visited, overrideColor);
  const area2 = calculateArea(grid, col - 1, row, visited, overrideColor);
  const area3 = calculateArea(grid, col, row + 1, visited, overrideColor);
  const area4 = calculateArea(grid, col, row - 1, visited, overrideColor);

  let current: string[] = [];
  if (grid[row][col].color === overrideColor) {
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
