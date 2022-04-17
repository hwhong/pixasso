import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setTool } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./action-bar.module.css";
import classNames from "classnames";
import { sortedDefaults } from "../../helper/colors";
import { PixassoModal } from "../pixasso-modal/pixasso-modal";

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
  const [open, setOpen] = React.useState(false);
  const currentTool = useSelector((state: StateType) => state.pixel.tool);
  const color = useSelector((state: StateType) => state.pixel.color);

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
          setOpen(true);
        }}
      >
        Clear
      </button>
      <PixassoModal
        open={open}
        title="Are you sure?"
        description="This action will reset the canvas."
        setOpen={setOpen}
        onNoClick={() => {
          setOpen(false);
        }}
        onYesClick={() => {
          onClearClick();
          setOpen(false);
          dispatch(setTool(Tool.PENCIL));
          if (!color) {
            dispatch(setColor(sortedDefaults[0]));
          }
        }}
      />
    </div>
  );
}
