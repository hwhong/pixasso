import React, { useEffect } from "react";
import styles from "./app.module.css";
import { ActionBar } from "../action-bar/action-bar";
import { Grid } from "../grid/grid";
import { Sidebar } from "../side-bar/side-bar";
import { DownloadButton } from "../download-button/download-button";
import { DimensionPicker } from "../dimension-picker/dimension-picker";
import ReactGA from "react-ga";

const TRACKING_ID = "G-5J0KZ2DVPS";

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const onClearClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const setAnalytics = () => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview("page-viewed");
  };

  useEffect(() => {
    setAnalytics();
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <ActionBar onClearClick={onClearClick} />
        <Grid canvasRef={canvasRef} />
        <DimensionPicker onClearClick={onClearClick} />
      </div>
      <DownloadButton canvasRef={canvasRef} />
    </div>
  );
}

// [LAUNCH TODO]
// able to submit suggestions
// link socials?
// more bug on the platform
