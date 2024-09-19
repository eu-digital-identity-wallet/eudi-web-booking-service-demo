import { BookingDetailsDto } from "@/shared";
import CopyIcon from "../atoms/CopyIcon";
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useBookingStore } from "@/client/store/bookingStore";

type ConfirmationDetailsProps = {
  details: BookingDetailsDto;
  id: string;
  deviceType: string;
};

const ConfirmationDetails = ({
  details,
  id,
  deviceType,
}: ConfirmationDetailsProps) => {
  const {
    hotel,
    checkIn,
    checkOut,
    numberOfRooms,
    numberOfGuests,
    reservationDate,
  } = details;
  const { isLoading, issueConfirmationAsync  } = useBookingStore();

  return (
    <Box sx={{
      width:'100%',
    }} >
      <Box >
        <Typography variant="h5" fontWeight="bold">
          Υour reservation confirmation
        </Typography>
      </Box>

      {/* Hotel Details */}
      <Box >
        {/* <Typography variant="h6" color="success.main" fontWeight="bold">
          {hotel}
        </Typography> */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mr: 5 }}>
              <Typography fontWeight="bold">Check-in</Typography>
              <Typography color="primary">{checkIn}</Typography>
            </Box>
            <Box>
              <Typography fontWeight="bold">Check-out</Typography>
              <Typography color="primary">{checkOut}</Typography>
            </Box>
          </Box>
          <Typography sx={{ mt: 4 }} fontWeight="bold">
            Rooms and guests
          </Typography>
          <Typography color="primary">
            {`${numberOfRooms} Room, ${numberOfGuests} Guests`}
          </Typography>
        </Box>

        {/* Reservation ID */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold">YOUR RESERVATION ID:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2, fontWeight: "bold" }}>
              {id}
              <IconButton
                onClick={() => navigator.clipboard.writeText(id)}
                sx={{ ml: 2 }}
              >
                <CopyIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="textPrimary">
              Reservation date
            </Typography>
            <Typography color="primary">{reservationDate}</Typography>
          </Box>
        </Box>

        {/* Issue confirmation to EUDI wallet */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          {deviceType === "mobile" ? (
            <Button
              variant="contained"
              color="primary"
              sx={{ display: "flex", alignItems: "center", px: 2, py: 4 }}
            >
              <Image
                loading="lazy"
                src="/images/eudiwallet.svg"
                alt="EUDI Wallet"
                width={48}
                height={68} // Adjusted to maintain aspect ratio 1.41
                style={{ marginRight: 16 }}
              />
              Issue your reservation confirmation to EUDI Wallet
            </Button>
          ) : (
              <Button variant="contained" color="primary"  onClick={async ()=> { await issueConfirmationAsync(id) }} sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                  {isLoading && <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />}
                  <Typography sx={{ color: "white" }}>Issue your reservation confirmation to EUDI Wallet</Typography>
                </Box>
                <Image loading="lazy" src="/images/qrcode.svg" alt="QR Code" width={41} height={41} />
              </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationDetails;