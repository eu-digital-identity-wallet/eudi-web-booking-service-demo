import Sidebar from "@/client/components/atoms/Sidebar";
import Modal from "@/client/components/molecules/Modal";
import { BookingForm } from "@/client/components/organisms/BookingForm";
import HotelLocation from "@/client/components/organisms/HotelLocation";
import { useBookingVerify } from "@/client/hooks/useBookingVerify";
import { useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import { getDeviceTypeProps } from "@/helpers/deviceDetect";
import { Box, Grid2 as Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useEffect } from "react";
import QRCode from "react-qr-code";

export function getServerSideProps(context: GetServerSidePropsContext) {
  return getDeviceTypeProps(context);
}

export default function Home(props: AppProps) {
  const { setDeviceType, modal } = useAppStore();
  const { bookingCreateRes } = useBookingStore();

  const { stopPolling } = useBookingVerify();

  const handleCloseModal = () => {
    stopPolling();
  };

  useEffect(() => {
    setDeviceType(props.pageProps.deviceType);
  }, [props.pageProps.deviceType, setDeviceType]);

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", pb: 1, pt: 1, pl: 3, pr: 3 }}>
      <Modal
        title="Verify your credentials"
        content={
          bookingCreateRes?.url && (
            <QRCode value={bookingCreateRes.url} size={333} />
          )
        }
        handleClose={handleCloseModal}
      />
      <HotelLocation />
      <Grid container spacing={3}>
        <Grid component={Box} size={{ md: 8, lg:9 }} >
          <BookingForm />
        </Grid>
        <Grid component={Box} size={{ md: 4, lg:3 }} sx={{ width: "100%" }}>
          <Sidebar />
        </Grid>
      </Grid>
    </Box>
  );
}
