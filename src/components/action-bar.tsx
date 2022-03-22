import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addColor, setColor, setTool } from "../actions/pixels";
import { StateType } from "../app/store";
import styles from "./action-bar.module.css";

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

  return (
    <div className={styles.root}>
      <button
        onClick={() => {
          dispatch(setTool(Tool.PENCIL));
          dispatch(setColor("#000000"));
        }}
      >
        Pencil
      </button>
      <button
        onClick={() => {
          dispatch(setTool(Tool.BUCKET));
          dispatch(setColor("#0000ff"));
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
    </div>
  );
}
