import React from "react";
import styles from "./app.module.css";
import { ActionBar } from "../action-bar/action-bar";
import { Grid } from "../grid/grid";
import { Sidebar } from "../side-bar/side-bar";
import { DownloadButton } from "../download-button/download-button";
import { DimensionPicker } from "../dimension-picker/dimension-picker";

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const onClearClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className={styles.root}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <ActionBar onClearClick={onClearClick} />
        <Grid canvasRef={canvasRef} />
        <DimensionPicker />
      </div>
      <DownloadButton canvasRef={canvasRef} />
    </div>
  );
}
