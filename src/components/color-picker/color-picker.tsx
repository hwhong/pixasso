import React from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./color-picker.module.css";

export function ColorPicker() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const currentColor = useSelector((state: StateType) => state.pixel.color);

  return (
    <div>
      <button
        className={styles.add}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      />
      {isOpen ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={() => setIsOpen(false)} />
          <ChromePicker
            color={currentColor}
            onChangeComplete={({ hex }, e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(setColor(hex));
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
