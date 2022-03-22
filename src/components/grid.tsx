import React from "react";
import styles from "./grid.module.css";
import { useSelector } from "react-redux";
import { Tool } from "./action-bar";
import { StateType } from "../app/store";
import { MetaLayer } from "../type/type";
import {
  calculateArea,
  DIVIDER,
  initGrid,
  initVisited,
} from "../helper/helper";
import classNames from "classnames";

export function Grid() {
  const tool = useSelector((state: StateType) => state.pixel.tool);
  const color = useSelector((state: StateType) => state.pixel.color);
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

  const draw = (row: number, col: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(col * 50, row * 50, 50, 50);
      ctx.stroke();
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [row, col] = (e.target as any).textContent.split(DIVIDER);
    // !important
    if (isMouseDown && tool !== Tool.BUCKET) {
      draw(row, col);

      // default is when tool is pencil, in which case we always fill
      let filled = true;
      if (tool === Tool.ERASER) {
        filled = false;
      }

      grid[row][col] = { ...grid[row][col], filled };
      setGrid(grid);
    }
  };

  const onClick = (row: number, col: number) => {
    if (tool === Tool.PENCIL || tool === Tool.ERASER) {
      draw(row, col);

      let filled = true;
      if (tool === Tool.ERASER) {
        filled = false;
      }

      grid[row][col] = {
        ...grid[row][col],
        filled,
      };
    } else {
      // x, y => col, row
      const areas = calculateArea(grid, col, row, initVisited());
      areas.forEach((a) => {
        const [row, col] = a.split(DIVIDER).map((s) => parseInt(s));
        draw(row, col);

        grid[row][col] = {
          ...grid[row][col],
          filled: true,
        };
      });
    }
    setGrid(grid);
  };

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  return (
    <div className={styles.parentLayer}>
      <div
        className={styles.wrapper}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {Array.from(Array(10).keys()).map((row) =>
          Array.from(Array(10).keys()).map((col) => (
            <div
              key={`${row}${DIVIDER}${col}`}
              className={classNames(styles.gridItem, {
                [styles.overrideHover]: grid[row][col].filled,
              })}
              onClick={() => onClick(row, col)}
            >{`${row}${DIVIDER}${col}`}</div>
          ))
        )}
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
