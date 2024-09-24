import { useAppStore, useBookingStore } from "@/client/store";
import { BookingDetailsDto } from "@/shared";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { toast } from "react-toastify";
import AccommodationIcon from "../atoms/AccommodationIcon";
import CopyIcon from "../atoms/CopyIcon";

type Props = { details: BookingDetailsDto; id: string; deviceType: string };

export default function ReservationConfirmation({
  details,
  id,
  deviceType,
}: Props) {
  const {
    checkIn,
    checkOut,
    numberOfRooms,
    numberOfGuests,
    reservationDate,
    hotel,
  } = details;

  const { changeModalStatus, modal } = useAppStore(); // Get modal state
  const { isLoading, issueConfirmationAsync, issueConfirmationRes } =
    useBookingStore();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.info("Successfully copied to clipboard");
  };

  const issueConfirmation = async () => {
    await issueConfirmationAsync(id);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <AccommodationIcon />
        <Typography fontWeight={"bold"}>
          Here is your resenvation confirmation
        </Typography>
      </Box>

      {/* Hotel Details */}
      <Box sx={{ mt: 2 }}>
        <Typography fontWeight='bold' color='green'>
          {hotel}
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 5 }}>
            <Typography color='black'>Check-in</Typography>
            <Typography color='primary'>{checkIn}</Typography>
          </Box>
          <Box>
            <Typography color='black'>Check-out</Typography>
            <Typography color='primary'>{checkOut}</Typography>
          </Box>
        </Box>
        <Typography sx={{ mt: 1 }} color='black'>
          Rooms and guests
        </Typography>
        <Typography color='primary'>
          {`${numberOfRooms} Room, ${numberOfGuests} Guests`}
        </Typography>
      </Box>
      {/* Reservation ID */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography fontWeight='bold'>YOUR RESERVATION ID:</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              fontWeight: "bold",
            }}
          >
            <Typography fontWeight='bold' color='primary'>
              {id}
            </Typography>

            <IconButton onClick={copyToClipboard}>
              <CopyIcon color='primary' />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant='body2' color='textPrimary'>
            Reservation date
          </Typography>
          <Typography color='primary'>{reservationDate}</Typography>
        </Box>
      </Box>

      {/* Issue confirmation to EUDI wallet */}
      <Box sx={{ mt: 4 }}>
        <Button
          color='primary'
          variant='contained'
          sx={{ p: 2, fontWeight: "bold" }}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
            ) : (
              <Image
                src='/images/eudiwallet.svg'
                alt='reviews'
                width={40}
                height={40}
              />
            )
          }
          onClick={issueConfirmation}
        >
          Issue your reservation confirmation to EUDI Wallet
        </Button>
      </Box>
    </Box>
  );
}
