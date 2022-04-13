import classNames from "classnames";
import React from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addColor, setColor } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./color-picker.module.css";
import Popover from "@mui/material/Popover";

export function ColorPicker() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = React.useState<string>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const currentColor = useSelector((state: StateType) => state.pixel.color);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        aria-describedby={id}
        className={classNames(styles.add, { [styles.open]: open })}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      />
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <div className={styles.wrapper}>
          <ChromePicker
            color={currentColor}
            onChangeComplete={({ hex }, e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(setColor(hex));
              setSelectedColor(hex);
            }}
          />
          <button
            className={styles.addButton}
            onClick={() => {
              if (selectedColor) {
                dispatch(setColor(selectedColor));
                dispatch(addColor(selectedColor));
                setAnchorEl(null);
              }
            }}
          >
            Add
          </button>
        </div>
      </Popover>
    </div>
  );
}
