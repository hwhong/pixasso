import React from "react";
import styles from "./download-button.module.css";

interface DownloadButtonProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export function DownloadButton({ canvasRef }: DownloadButtonProps) {
  return (
    <button
      className={styles.root}
      onClick={() => {
        const canvas = canvasRef.current;
        if (canvas) {
          var link = document.createElement("a");
          link.download = "filename.png";
          link.href = canvas.toDataURL();
          link.click();
        }
      }}
    >
      Download
    </button>
  );
}
