import React from "react";
import styles from "./download-button.module.css";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Modal from "@mui/material/Modal";
import classNames from "classnames";
import { modalStyle } from "../pixasso-modal/helper";
import Typography from "@mui/material/Typography";

interface DownloadButtonProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export function DownloadButton({ canvasRef }: DownloadButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [filename, setFilename] = React.useState("");
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className={styles.root}
        onClick={() => {
          setOpen(true);
        }}
      >
        Download
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the name of the image file
          </Typography>
          <OutlinedInput
            className={styles.input}
            size="small"
            value={filename}
            placeholder="Name"
            onChange={({ target }) => setFilename(target.value)}
          />
          <div className={styles.buttonsAction}>
            <button
              className={classNames(styles.button, styles.yesButton)}
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  var link = document.createElement("a");
                  link.download = `${filename}.png`;
                  link.href = canvas.toDataURL();
                  link.click();
                }
                setOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
