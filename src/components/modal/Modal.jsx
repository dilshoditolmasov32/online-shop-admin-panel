import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Modal.css";

export default function BasicModal({
  open,
  setOpen,
  onConfirm,
  confirmText = "Delete",
  cancelText = "Bekor qilish",
}) {
  const [submitting, setSubmitting] = React.useState(false);

  const handleClose = () => {
    if (!submitting) {
      setOpen(false);
    }
  };

  const handleConfirm = async () => {
    if (typeof onConfirm !== "function" || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "90%",
            sm: "350px",
            md: "400px",
            lg: "450px",
            xl: "600px",
          },
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 6,
          p: {
            md: 3,
            xl: 4,
          },
          borderRadius: "20px",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginBottom: "24px",
            fontWeight: 600,
            color: "#000",
          }}
        >
          Вы действительно хотите удалить?
        </Typography>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleClose}
            className="modal-cancelBtn"
            disabled={submitting}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="modal-deleteBtn"
            disabled={submitting}
          >
            {submitting ? "O'chirilmoqda..." : confirmText}
          </button>
        </div>
      </Box>
    </Modal>
  );
}
