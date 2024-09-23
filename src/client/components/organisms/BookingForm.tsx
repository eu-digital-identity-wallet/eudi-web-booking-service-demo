import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import { bookingDtoSchema } from "@/server/schemas/booking";
import { BookingDto, Hotel } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BookingGuestInfo } from "../molecules/BookingGuestInfo";
import HotelDescription from "../molecules/HotelDescription";

export const BookingForm: React.FC = () => {
  const methods = useForm<BookingDto>({
    resolver: zodResolver(bookingDtoSchema),
    defaultValues: {
      hotel: Hotel.name,
      location: Hotel.location,
    },
  });
  const { changeModalStatus, modal } = useAppStore(); // Get modal state
  const { isLoading, createBookingAsync, bookingCreateRes } = useBookingStore();
  const deviceType = useAppStore((state) => state.deviceType);

  const onSubmit = async (data: BookingDto) => {
    await createBookingAsync(data);
  };

  // Watch for changes in bookingCreateRes
  useEffect(() => {
    if (bookingCreateRes?.url) {
      if (deviceType === "desktop") {
        changeModalStatus(ModalStatus.OPEN);
      } else {
        window.location.href = bookingCreateRes?.url; // Navigate to the confirmation page
      }
    }
  }, [bookingCreateRes?.url, deviceType, changeModalStatus]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 3 },
          }}
        >
          <Box
            sx={{
              width: { md: "calc(400px)", xs: "100%" },
              mt: { xs: 10, md: 0 },
            }}
          >
            <BookingGuestInfo />
          </Box>

          <Box
            sx={{
              width: { md: "calc(100%-550px)", xs: "100%" },
              mt: { xs: 10, md: 0 },
            }}
          >
            <HotelDescription />
            <Box
              sx={{
                p: 0,
                mt: 0,
                bgcolor: "neutral.50",
                color: "text.primary",
                fontWeight: "bold",
                maxWidth: 312,
                textAlign: "center",
                margin: "auto",
              }}
            >
              To continue booking your travel plan, issue the requested
              credentials using EUDI Wallet:
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                py: 2,
                mt: 3,
                flexWrap: "wrap",
              }}
            >
              {deviceType === "mobile" ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography color="white">Launch EUDI Wallet</Typography>
                  <Image
                    loading="lazy"
                    src="/images/eudiwallet.svg"
                    alt="EUDI Wallet"
                    width={48}
                    height={48}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {isLoading && (
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", mr: 1 }}
                      />
                    )}
                    <Typography sx={{ color: "white" }}>
                      Scan QR code
                    </Typography>
                  </Box>
                  <Image
                    loading="lazy"
                    src="/images/qrcode.svg"
                    alt="QR Code"
                    width={41}
                    height={41}
                  />
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
};
