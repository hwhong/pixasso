import React from "react";
import styles from "./grid.module.css";
import { useSelector } from "react-redux";
import { Tool } from "../action-bar/action-bar";
import { StateType } from "../../app/store";
import { GridItemData } from "../../type/type";
import {
  calculateArea,
  CANVAS_SIZE,
  DIVIDER,
  initializeGrid,
  makeVisitedGrid,
} from "../../helper/helper";
import classNames from "classnames";

interface GridProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export function Grid({ canvasRef }: GridProps) {
  const tool = useSelector((state: StateType) => state.pixel.tool);
  const color = useSelector((state: StateType) => state.pixel.color);
  const size = useSelector((state: StateType) => state.pixel.dimension);
  const dimension = CANVAS_SIZE / size;

  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<GridItemData[][]>(
    initializeGrid(dimension)
  );

  React.useEffect(() => {
    setGrid(initializeGrid(dimension));
  }, [dimension]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Make it visually fill the positioned parent
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      // ...then set the internal size to match
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Cavnas default background is not white
      const ctx = canvas?.getContext("2d")!;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvasRef]);

  const draw = (row: number, col: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d")!;

    if (canvas && color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(col * size, row * size, size, size);
      ctx.stroke();
    } else {
      ctx.clearRect(col * size, row * size, size, size);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [row, col] = (e.target as any).textContent.split(DIVIDER);
    // !important
    if (isMouseDown && tool !== Tool.BUCKET && tool !== Tool.CLEAR) {
      draw(row, col);

      // default is when tool is pencil, in which case we always fill
      let gridItemColor: GridItemData["color"] = color;
      if (tool === Tool.ERASER) {
        gridItemColor = undefined;
      }

      grid[row][col] = { ...grid[row][col], color: gridItemColor };
      setGrid(grid);
    }
  };

  const onClick = (row: number, col: number) => {
    if (tool === Tool.PENCIL || tool === Tool.ERASER) {
      draw(row, col);

      let gridItemColor: GridItemData["color"] = color;
      if (tool === Tool.ERASER) {
        gridItemColor = undefined;
      }

      grid[row][col] = {
        ...grid[row][col],
        color: gridItemColor,
      };
    } else if (tool !== Tool.CLEAR) {
      // x, y => col, row
      const areas = calculateArea(
        grid,
        col,
        row,
        makeVisitedGrid(dimension),
        grid[row][col].color
      );
      areas.forEach((a) => {
        const [row, col] = a.split(DIVIDER).map((s) => parseInt(s));
        draw(row, col);

        grid[row][col] = {
          ...grid[row][col],
          color,
        };
      });
    }
    setGrid(grid);
  };

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  return (
    <div className={styles.root}>
      <div
        className={styles.gridLayer}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        style={{
          gridTemplateColumns: `repeat(${dimension}, ${size}px)`,
          gridTemplateRows: `repeat(${dimension}, ${size}px)`,
        }}
      >
        {Array.from(Array(dimension).keys()).map((row) =>
          Array.from(Array(dimension).keys()).map((col) => (
            <div
              key={`${row}${DIVIDER}${col}`}
              className={classNames(styles.gridItem, {
                [styles.bucketCursor]: tool === Tool.BUCKET,
                [styles.eraserCursor]: tool === Tool.ERASER,
                [styles.pencilCursor]: tool === Tool.PENCIL,
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
