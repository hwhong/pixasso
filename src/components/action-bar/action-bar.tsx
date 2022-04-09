import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setColor, setDimension, setTool } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./action-bar.module.css";
import classNames from "classnames";
import { sortedDefaults } from "../../helper/colors";

interface ActionBarProps {
  onClearClick: () => void;
}

export enum Tool {
  PENCIL,
  BUCKET,
  ERASER,
  CLEAR,
}

// add animation when user hovers over the other buttons
// need to add background color

export function ActionBar({ onClearClick }: ActionBarProps) {
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
          if (!color) {
            dispatch(setColor(sortedDefaults[0]));
          }
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
          onClearClick();
        }}
      >
        Clear
      </button>
    </div>
  );
}
