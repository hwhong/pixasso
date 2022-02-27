import React from "react";
import styles from "./app.module.less";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/pixel";

export function App() {
  const color = useSelector((state: RootState) => state.colors);
  return <div className={styles.root}>ededed</div>;
}
