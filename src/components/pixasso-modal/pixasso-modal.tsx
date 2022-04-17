import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classNames from "classnames";
import styles from "./pixasso-modal.module.css";

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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
