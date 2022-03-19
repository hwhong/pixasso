import React from "react";
import styles from "./app.module.css";
import { useSelector } from "react-redux";
import { PixelRootState } from "../reducer/pixel";
import { ActionBar } from "./action-bar";

export function App() {
  //const color = useSelector((state: PixelRootState) => state.colors);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);

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
              const [x, y] = (e.target as any).textContent.split("-");
              if (canvas?.getContext) {
                const ctx = canvas.getContext("2d")!;
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.fillRect(x * 50, y * 50, 50, 50);
                ctx.stroke();
              }
            }
          }}
          onMouseUp={() => {
            setIsMouseDown(false);
          }}
        >
          {Array.from(Array(10).keys()).map((y) =>
            Array.from(Array(10).keys()).map((x) => (
              <div
                key={`${x}-${y}`}
                className={styles.gridItem}
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas?.getContext) {
                    const ctx = canvas.getContext("2d")!;
                    ctx.beginPath();
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(x * 50, y * 50, 50, 50);
                    ctx.stroke();
                  }
                }}
              >{`${x}-${y}`}</div>
            ))
          )}
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
