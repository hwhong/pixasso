import React from "react";
import styles from "./side-bar.module.css";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, setColor } from "../../actions/pixels";
import classNames from "classnames";
import { StateType } from "../../app/store";
import pixasso from "../../image/pixasso.svg";
import { ColorPicker } from "../color-picker/color-picker";
import Popover from "@mui/material/Popover";

export function Sidebar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const color = useSelector((state: StateType) => state.pixel.color);
  const palette = useSelector((state: StateType) => state.pixel.palette);
  const { Panel } = Collapse;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <img src={pixasso} className={styles.logo} />
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={() => {}}
        expandIconPosition="right"
        collapsible="disabled"
      >
        <Panel
          header={
            <div className={styles.header}>
              <span>Default Palette</span>
            </div>
          }
          key="1"
          showArrow={false}
        >
          <div className={styles.content}>
            {palette[0].map((c) => (
              <button
                key={c}
                style={{ backgroundColor: c }}
                onClick={() => dispatch(setColor(c))}
                className={classNames(styles.color, {
                  [styles.selected]: c === color,
                })}
              />
            ))}
          </div>
        </Panel>
        <Panel
          header={
            <div className={styles.header}>
              <span>Custom Palette</span>
              <ColorPicker />
            </div>
          }
          key="1"
          showArrow={false}
        >
          <div className={styles.content}>
            {palette[1].map((c) => (
              <>
                <button
                  key={c}
                  aria-describedby={id}
                  style={{ backgroundColor: c }}
                  onClick={() => dispatch(setColor(c))}
                  className={classNames(styles.color, {
                    [styles.selected]: c === color,
                  })}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setAnchorEl(e.currentTarget);
                  }}
                />
                <Popover
                  key={c}
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
                      dispatch(deleteColor(c));
                      setAnchorEl(null);
                    }}
                  >
                    Delete
                  </div>
                </Popover>
              </>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
