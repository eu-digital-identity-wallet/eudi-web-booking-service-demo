import { useEffect } from "react";
import Sidebar from "@/client/components/atoms/Sidebar";
import { BookingForm } from "@/client/components/organisms/BookingForm";
import HotelLocation from "@/client/components/organisms/HotelLocation";
import { ModalStatus, useAppStore } from "@/client/store";
import { deviceDetect } from "@/helpers/deviceDetect";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { Box, Container } from "@mui/material";
import Modal from "@/client/components/molecules/Modal";
import { useBookingStore } from "@/client/store/bookingStore";
import QRCode from "react-qr-code";
import { useBookingVerify } from "@/client/hooks/useBookingVerify";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const deviceType = deviceDetect(context.req.headers["user-agent"] ?? "");
  return { props: { deviceType } };
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
  <Box sx={{width: '100%', maxWidth:'100%',pb:1,pt:1,pl:3,pr:3}}>     
        <Modal 
          title="Verify your credentials" 
          content={bookingCreateRes?.url && <QRCode value={bookingCreateRes.url} />} 
          handleClose={handleCloseModal}
          />
        <HotelLocation />
        <Box sx={{  width: "100%", mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 3 },
            }}
          >
            <BookingForm />
            <Sidebar />
          </Box>
        </Box> 
    </Box>
  );
}
