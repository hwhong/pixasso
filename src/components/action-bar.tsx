import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addColor, setColor, setDimension, setTool } from "../actions/pixels";
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
  const size = useSelector((state: StateType) => state.pixel.dimension);

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
          dispatch(setColor(undefined));
        }}
      >
        Eraser
      </button>
      <div>{Object.values(Tool)[tool]}</div>
      <ColorPicker />
      <div style={{ backgroundColor: color }} className={styles.preview}></div>
      <button
        onClick={() => {
          dispatch(setDimension(16));
        }}
      >
        16
      </button>
      <button
        onClick={() => {
          dispatch(setDimension(32));
        }}
      >
        32
      </button>
      <button
        onClick={() => {
          dispatch(setDimension(64));
        }}
      >
        64
      </button>
      <button
        onClick={() => {
          dispatch(setDimension(128));
        }}
      >
        128
      </button>
      <div>{size}</div>
    </div>
  );
}
