import React from "react";
import { connect, useDispatch } from "react-redux";
import { addColor } from "../actions/pixels";
import { StateType } from "../app/store";
import styles from "./action-bar.module.css";

interface Props {
  colors: string[];
}

export const ActionBar = connect((state: StateType) => ({
  colors: state.pixel.colors,
}))(ActionBarComponent);

function ActionBarComponent({ colors }: Props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.root} onClick={() => dispatch(addColor("hheeyy"))}>
      {colors.map((c) => c)}
    </div>
  );
}
