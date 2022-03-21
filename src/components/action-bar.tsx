import React from "react";
import { connect, useDispatch } from "react-redux";
import { addColor, setTool } from "../actions/pixels";
import { StateType } from "../app/store";
import styles from "./action-bar.module.css";

interface Props {}

export const ActionBar = connect((state: StateType) => ({}))(
  ActionBarComponent
);

export enum Tool {
  PENCIL,
  BUCKET,
}

function ActionBarComponent({}: Props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <button onClick={() => dispatch(setTool(Tool.PENCIL))}>Pencil</button>
      <button onClick={() => dispatch(setTool(Tool.BUCKET))}>Bucket</button>
    </div>
  );
}
