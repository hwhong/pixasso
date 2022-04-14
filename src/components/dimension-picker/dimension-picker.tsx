import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./dimension-picker.module.css";
import { Dimension } from "../../helper/dimension";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../app/store";
import { setDimension } from "../../actions/pixels";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classNames from "classnames";

interface DimensionPickerProps {
  onClearClick: () => void;
}

export function DimensionPicker({ onClearClick }: DimensionPickerProps) {
  const dispatch = useDispatch();
  const size = useSelector((state: StateType) => state.pixel.dimension);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 4,
  };

  return (
    <>
      <div className={styles.root}>
        <Select
          value={size.toString()}
          onChange={(event: SelectChangeEvent) => {
            const value = event.target.value;
            setValue(value);
            setOpen(true);
          }}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "10px 32px 10px 12px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          style={{ borderRadius: 28, fontWeight: "bold" }}
        >
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={64}>64</MenuItem>
          <MenuItem value={128}>128</MenuItem>
        </Select>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Changing the size of the pixel will reset the canvas.
          </Typography>
          <div className={styles.buttonsAction}>
            <button
              className={classNames(styles.button, styles.noButton)}
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </button>
            <button
              className={classNames(styles.button, styles.yesButton)}
              onClick={() => {
                dispatch(setDimension(parseInt(value) as Dimension));
                onClearClick();
                setOpen(false);
              }}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
