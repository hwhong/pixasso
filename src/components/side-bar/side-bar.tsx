import React from "react";
import styles from "./side-bar.module.css";
import { Collapse } from "antd";
import { DEFAULT_COLORS } from "../../helper/colors";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../actions/pixels";
import classNames from "classnames";
import { StateType } from "../../app/store";

export function Sidebar() {
  const color = useSelector((state: StateType) => state.pixel.color);
  const dispatch = useDispatch();
  const { Panel } = Collapse;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.logo}></div>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={() => {}}
        expandIconPosition="right"
      >
        <Panel header="Color" key="1" showArrow>
          <div className={styles.content}>
            {DEFAULT_COLORS.map((c) => (
              <div
                key={c}
                style={{ backgroundColor: c }}
                className={classNames(styles.color, {
                  [styles.selected]: c === color,
                })}
                onClick={() => dispatch(setColor(c))}
              />
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
