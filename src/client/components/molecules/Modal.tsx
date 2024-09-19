import React from "react";
import { Box, Button, Typography, Modal as MuiModal } from "@mui/material";
import QRCode from "react-qr-code";
import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingVerify } from "../../hooks/useBookingVerify";

interface ModalProps {
  title: string;  // Accept title as a prop
  content: React.ReactNode;  // Accept content as a prop
  handleClose: () => void;  // Close function prop
}

const Modal: React.FC<ModalProps> = ({ title, content, handleClose }) => {
  const { modal } = useAppStore();
  

  if (modal === ModalStatus.CLOSE) return null;

  return (
    <MuiModal
      open={modal === ModalStatus.OPEN}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          mx: "auto",
          my: 4,
          width: { xs: "90%", md: "40%" },
        }}
      >
        <Typography id="modal-title" variant="h5" fontWeight="bold" mb={2}>
          {title}  {/* Display the title prop */}
        </Typography>

        <Box id="modal-description" sx={{ textAlign: "center", mb: 4 }}>
          {content}  {/* Display the content prop */}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ px: 4, py: 2 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
