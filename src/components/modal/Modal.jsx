import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteProductData } from "../../../service";
import "./Modal.css";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export default function BasicModal({
  open,
  setOpen,
  titleText,
  selectedProductId,
  setSelectedProductId,
  products,
  setProducts,
}) {
  const handleClose = () => setOpen(false);
  const handleDeleteProduct = async () => {
    const id = selectedProductId.element.id;

    try {
      await deleteProductData(id);
      setOpen(false);
      window.location.reload();
      setProducts(products?.filter((item) => item.id !== id));
      setSelectedProductId(null);
    } catch (error) {
      error;
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
            xl:"600px"
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
          {titleText}
        </Typography>
        <button onClick={handleDeleteProduct} className="modal-deleteBtn">
          Удалить
        </button>
      </Box>
    </Modal>
  );
}
