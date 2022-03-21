import React from "react";
import styles from "./app.module.css";
import { useSelector } from "react-redux";
import { PixelRootState } from "../reducer/pixel";
import { ActionBar, Tool } from "./action-bar";
import { StateType } from "../app/store";

interface MetaLayer {
  index: string;
  filled: boolean;
}

// index: {4-1}
function initGrid(): MetaLayer[][] {
  const grid: MetaLayer[][] = [];
  Array.from(Array(10).keys()).forEach((row) => {
    let arr: MetaLayer[] = [];
    Array.from(Array(10).keys()).forEach((col) => {
      arr.push({ index: `${row}-${col}`, filled: false });
    });
    grid.push(arr);
  });
  return grid;
}

function initVisited(): boolean[][] {
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

function calculateArea(
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

export function App() {
  const tool = useSelector((state: StateType) => state.pixel.currentTool);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<MetaLayer[][]>(initGrid());

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Make it visually fill the positioned parent
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      // ...then set the internal size to match
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [canvasRef]);

  return (
    <div className={styles.root}>
      <ActionBar />

      <div className={styles.parentLayer}>
        <div
          className={styles.wrapper}
          onMouseDown={(e) => {
            setIsMouseDown(true);
          }}
          onMouseMove={(e) => {
            if (isMouseDown) {
              const canvas = canvasRef.current;
              const [row, col] = (e.target as any).textContent.split("-");
              if (canvas?.getContext) {
                const ctx = canvas.getContext("2d")!;
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.fillRect(col * 50, row * 50, 50, 50);
                ctx.stroke();
              }
              grid[row][col] = { index: `${row}-${col}`, filled: true };
              setGrid(grid);
            }
          }}
          onMouseUp={() => {
            setIsMouseDown(false);
          }}
        >
          {Array.from(Array(10).keys()).map((row) =>
            Array.from(Array(10).keys()).map((col) => (
              <div
                key={`${row}-${col}`}
                className={styles.gridItem}
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas?.getContext) {
                    if (tool === Tool.PENCIL) {
                      const ctx = canvas.getContext("2d")!;
                      ctx.beginPath();
                      ctx.fillStyle = "#000000";
                      ctx.fillRect(col * 50, row * 50, 50, 50);
                      ctx.stroke();
                      grid[row][col] = { index: `${row}-${col}`, filled: true };
                      console.log("there");
                    } else {
                      // x, y => col, row
                      const areas = calculateArea(
                        grid,
                        col,
                        row,
                        initVisited()
                      );
                      console.log(areas);
                      areas.forEach((a) => {
                        const [row, col] = a.split("-");
                        const ctx = canvas.getContext("2d")!;
                        ctx.beginPath();
                        ctx.fillStyle = "#0000ff";
                        // col, row
                        ctx.fillRect(
                          parseInt(col) * 50,
                          parseInt(row) * 50,
                          50,
                          50
                        );
                        ctx.stroke();
                        grid[parseInt(row)][parseInt(col)] = {
                          index: `${row}-${col}`,
                          filled: true,
                        };
                      });
                    }
                    setGrid(grid);
                  }
                }}
              >{`${row}-${col}`}</div>
            ))
          )}
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
