import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, setColor, setTool } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./custom-color.module.css";
import Popover from "@mui/material/Popover";
import { Tool } from "../action-bar/action-bar";

interface CustomColorProps {
  color: string;
}

export function CustomColor({ color }: CustomColorProps) {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state: StateType) => state.pixel.color);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        key={color}
        aria-describedby={id}
        style={{ backgroundColor: color }}
        onClick={() => {
          dispatch(setTool(Tool.PENCIL));
          dispatch(setColor(color));
        }}
        className={classNames(styles.color, {
          [styles.selected]: color === selectedColor,
        })}
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorEl(e.currentTarget);
        }}
      />
      <Popover
        key={color}
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <div
          className={styles.wrapper}
          onClick={() => {
            dispatch(deleteColor(color));
            setAnchorEl(null);
          }}
        >
          Delete
        </div>
      </Popover>
    </>
  );
}
