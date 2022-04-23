import React from "react";
import styles from "./side-bar.module.css";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../actions/pixels";
import classNames from "classnames";
import { StateType } from "../../app/store";
import pixasso from "../../image/pixasso.svg";
import { ColorPicker } from "../color-picker/color-picker";
import { CustomColor } from "../custom-color/custom-color";

export function Sidebar() {
  const dispatch = useDispatch();
  const color = useSelector((state: StateType) => state.pixel.color);
  const palette = useSelector((state: StateType) => state.pixel.palette);
  const { Panel } = Collapse;

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
          className={styles.panel}
        >
          <div className={styles.content}>
            {palette[1]
              .filter((c) => !!c)
              .map((c) => (
                <CustomColor color={c} key={c} />
              ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
