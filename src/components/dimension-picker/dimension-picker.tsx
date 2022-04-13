import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./dimension-picker.module.css";
import { Dimension } from "../../helper/dimension";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../app/store";
import { setDimension } from "../../actions/pixels";

export function DimensionPicker() {
  const dispatch = useDispatch();
  const size = useSelector((state: StateType) => state.pixel.dimension);

  return (
    <div className={styles.root}>
      <Select
        className={styles.dropdown}
        value={size.toString()}
        onChange={(event: SelectChangeEvent) => {
          const value = event.target.value;
          dispatch(setDimension(parseInt(value) as Dimension));
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={32}>32</MenuItem>
        <MenuItem value={64}>64</MenuItem>
        <MenuItem value={128}>128</MenuItem>
      </Select>
    </div>
  );
}