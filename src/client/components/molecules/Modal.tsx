import React from "react";
import { Box, Button, Typography, Modal as MuiModal } from "@mui/material";
import QRCode from "react-qr-code";
import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import { useBookingVerify } from "../../hooks/useBookingVerify";

const Modal: React.FC = () => {
  const { modal } = useAppStore();
  const { bookingCreateRes } = useBookingStore();
  const { stopPolling } = useBookingVerify();

  const handleCloseModal = () => {
    stopPolling();
  };

  if (modal === ModalStatus.CLOSE) return null;

  return (
    <MuiModal
      open={modal === ModalStatus.OPEN}
      onClose={handleCloseModal}
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
          Verify your credentials
        </Typography>

        <Box id="modal-description" sx={{ textAlign: "center", mb: 4 }}>
          {bookingCreateRes?.url && <QRCode value={bookingCreateRes.url} />}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
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