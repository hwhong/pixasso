import React from "react";
import styles from "./app.module.css";
import { ActionBar } from "./action-bar";
import { Grid } from "./grid";

export function App() {
  return (
    <div className={styles.root}>
      <ActionBar />
      <Grid />
    </div>
  );
}
