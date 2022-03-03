import React from "react";
import styles from "./app.module.css";
import { useSelector } from "react-redux";
import { PixelRootState } from "../reducer/pixel";
import { ActionBar } from "./action-bar";

export function App() {
  const color = useSelector((state: PixelRootState) => state.colors);
  return (
    <div className={styles.root}>
      <ActionBar />
    </div>
  );
}
