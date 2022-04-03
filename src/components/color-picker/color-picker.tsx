import React from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addColor, setColor } from "../../actions/pixels";
import { StateType } from "../../app/store";
import styles from "./color-picker.module.css";

export function ColorPicker() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedColor, setSelectedColor] = React.useState<string>();
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
          <div className={styles.wrapper}>
            <ChromePicker
              color={currentColor}
              onChangeComplete={({ hex }, e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(setColor(hex));
                setSelectedColor(hex);
                console.log(1, selectedColor);
              }}
            />
            <button
              className={styles.addButton}
              onClick={(e) => {
                console.log(2, selectedColor);
                if (selectedColor) {
                  dispatch(setColor(selectedColor));
                  dispatch(addColor(selectedColor));
                  setIsOpen(false);
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// import React from "react";
// import { ChromePicker } from "react-color";
// import { useDispatch, useSelector } from "react-redux";
// import { addColor, setColor } from "../../actions/pixels";
// import { StateType } from "../../app/store";
// import styles from "./color-picker.module.css";

// export function ColorPicker() {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = React.useState<boolean>(false);
//   const [selectedColor, setSelectedColor] = React.useState<string>();
//   const currentColor = useSelector((state: StateType) => state.pixel.color);

//   return (
//     <div>
//       <button
//         className={styles.add}
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsOpen(true);
//         }}
//       />
//       {isOpen ? (
//         <div className={styles.popover}>
//           <div className={styles.cover} onClick={() => setIsOpen(false)} />
//           <ChromePicker
//             color={currentColor}
//             onChangeComplete={({ hex }, e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               //setSelectedColor(hex);
//             }}
//           />
//           {/* <button
//             onClick={() => {
//               if (selectedColor) {
//                 dispatch(setColor(selectedColor));
//                 dispatch(addColor(selectedColor));
//               }
//             }}
//           >
//             Add
//           </button> */}
//         </div>
//       ) : null}
//     </div>
//   );
// }
