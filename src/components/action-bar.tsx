import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addColor, setColor, setTool } from "../actions/pixels";
import { StateType } from "../app/store";
import styles from "./action-bar.module.css";
import { ColorResult, SketchPicker } from "react-color";
import { ColorPicker } from "./color-picker";

interface Props {}

export const ActionBar = connect((state: StateType) => ({}))(
  ActionBarComponent
);

export enum Tool {
  PENCIL,
  BUCKET,
  ERASER,
}

function ActionBarComponent({}: Props) {
  const dispatch = useDispatch();
  const tool = useSelector((state: StateType) => state.pixel.tool);
  const color = useSelector((state: StateType) => state.pixel.color);

  return (
    <div className={styles.root}>
      <button
        onClick={() => {
          dispatch(setTool(Tool.PENCIL));
        }}
      >
        Pencil
      </button>
      <button
        onClick={() => {
          dispatch(setTool(Tool.BUCKET));
        }}
      >
        Bucket
      </button>
      <button
        onClick={() => {
          dispatch(setTool(Tool.ERASER));
          dispatch(setColor("#FFFFFF"));
        }}
      >
        Eraser
      </button>
      <div>{Object.values(Tool)[tool]}</div>
      <ColorPicker />
      <div style={{ backgroundColor: color }} className={styles.preview}></div>
    </div>
  );
}
