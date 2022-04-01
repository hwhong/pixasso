import React from "react";
import styles from "./side-bar.module.css";
import { Collapse } from "antd";
import { DEFAULT_COLORS } from "../../helper/colors";
import { useDispatch } from "react-redux";
import { setColor } from "../../actions/pixels";

export function Sidebar() {
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
              // <div key={c} className={styles.colorBox}>
              //   {c}
              //   <div
              //     style={{ backgroundColor: c }}
              //     className={styles.preview}
              //   />
              // </div>
              <div
                key={c}
                style={{ backgroundColor: c }}
                className={styles.colorBox}
                onClick={() => dispatch(setColor(c))}
              ></div>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
