import React from "react";
import styles from "./side-bar.module.css";
import { Collapse } from "antd";
import { DEFAULT_COLORS } from "../../helper/colors";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../actions/pixels";
import classNames from "classnames";
import { StateType } from "../../app/store";
import pixasso from "../../image/pixasso.svg";

export function Sidebar() {
  const dispatch = useDispatch();
  const color = useSelector((state: StateType) => state.pixel.color);
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
      >
        <Panel header="Color" key="1" showArrow>
          <div className={styles.content}>
            {DEFAULT_COLORS.map((c) => (
              <button
                key={c}
                style={{ backgroundColor: c }}
                onClick={() => dispatch(setColor(c))}
                className={classNames(styles.color, {
                  [styles.selected]: c === color,
                })}
              />
            ))}
            <button className={classNames(styles.add)} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
