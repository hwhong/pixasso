import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setColor, setDimension, setTool } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./action-bar.module.css";
import classNames from "classnames";

interface Props {}

export const ActionBar = connect((state: StateType) => ({}))(
  ActionBarComponent
);

export enum Tool {
  PENCIL,
  BUCKET,
  ERASER,
  CLEAR,
}

function ActionBarComponent({}: Props) {
  const dispatch = useDispatch();
  const currentTool = useSelector((state: StateType) => state.pixel.tool);
  const color = useSelector((state: StateType) => state.pixel.color);
  const size = useSelector((state: StateType) => state.pixel.dimension);

  const getClassName = (tool: Tool) =>
    classNames(styles.button, { [styles.active]: tool === currentTool });

  return (
    <div className={styles.root}>
      <button
        className={getClassName(Tool.PENCIL)}
        onClick={() => {
          dispatch(setTool(Tool.PENCIL));
        }}
      >
        Pencil
      </button>
      <button
        className={getClassName(Tool.BUCKET)}
        onClick={() => {
          dispatch(setTool(Tool.BUCKET));
        }}
      >
        Bucket
      </button>
      <button
        className={getClassName(Tool.ERASER)}
        onClick={() => {
          dispatch(setTool(Tool.ERASER));
          dispatch(setColor(undefined));
        }}
      >
        Eraser
      </button>
      <button
        className={getClassName(Tool.CLEAR)}
        onClick={() => {
          dispatch(setTool(Tool.CLEAR));
          dispatch(setColor(undefined));
        }}
      >
        Clear
      </button>
    </div>
  );
}

// <div>{Object.values(Tool)[tool]}</div>
// <ColorPicker />
// <div style={{ backgroundColor: color }} className={styles.preview}></div>

// <div>{size}</div>

// <button
// onClick={() => {
//   dispatch(setDimension(16));
// }}
// >
// 16
// </button>
// <button
// onClick={() => {
//   dispatch(setDimension(32));
// }}
// >
// 32
// </button>
// <button
// onClick={() => {
//   dispatch(setDimension(64));
// }}
// >
// 64
// </button>
// <button
// onClick={() => {
//   dispatch(setDimension(128));
// }}
// >
// 128
// </button>
