import React from "react";
import styles from "./app.module.css";
import { ActionBar } from "../action-bar/action-bar";
import { Grid } from "../grid/grid";
import { Sidebar } from "../side-bar/side-bar";

export function App() {
  return (
    <div className={styles.root}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <ActionBar />
        <Grid />
      </div>
    </div>
  );
}
