import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classNames from "classnames";
import styles from "./pixasso-modal.module.css";
import { modalStyle } from "./helper";

interface ModalProps {
  description: string;
  title: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;

  onYesClick: () => void;
  onNoClick: () => void;
}

export function PixassoModal({
  description,
  title,
  open,
  setOpen,
  onNoClick,
  onYesClick,
}: ModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <div className={styles.buttonsAction}>
          <button
            className={classNames(styles.button, styles.noButton)}
            onClick={() => {
              onNoClick();
            }}
          >
            No
          </button>
          <button
            className={classNames(styles.button, styles.yesButton)}
            onClick={() => {
              onYesClick();
            }}
          >
            Yes
          </button>
        </div>
      </Box>
    </Modal>
  );
}
