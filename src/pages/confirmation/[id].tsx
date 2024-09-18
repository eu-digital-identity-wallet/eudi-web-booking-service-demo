import Sidebar from "@/client/components/atoms/Sidebar";
import CarRentalDetails from "@/client/components/organisms/CarRentalDetails";
import ConfirmationDetails from "@/client/components/organisms/ConfirmationDetails";
import HotelLocation from "@/client/components/organisms/HotelLocation";
import { deviceDetect } from "@/helpers/deviceDetect";
import { BookingService } from "@/server";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Container from "typedi";

export default function ConfirmationPage(props: AppProps) {
  const { id, deviceType, hasError, ...bookingDetails } = props.pageProps;
  if (hasError) {
    return (
      <div className="text-black text-lg font-bold p-4 ">Booking not found</div>
    );
  }
  return  (
      <Box sx={{width: '100%', maxWidth:'100%',pb:1,pt:1,pl:3,pr:3}}>     
        <HotelLocation />
  
        <Box sx={{  width: "100%", mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 3 },
            }}
          >
          
          <ConfirmationDetails details={bookingDetails} id={id} deviceType={deviceType} />
          
  
          {bookingDetails.carRental && (
            <Box sx={{ width: "25%", p: 2 }}>
              <CarRentalDetails />
            </Box>
          )}
  
          <Sidebar />
           
        </Box>
      </Box>
    </Box>
  );   
}

// Use dynamic id from the URL
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const deviceType = deviceDetect(context.req.headers["user-agent"] ?? "");

  const { id } = context.params as { id: string };
  const bookingService = Container.get(BookingService);
  let properties = {};
  try {
    const bookingDetails = await bookingService.bookingDetails(id);
    if (bookingDetails) {
      properties = { id, deviceType, ...bookingDetails, hasError: false };
    } else {
      properties = { hasError: true };
    }
  } catch (error) {
    properties = { hasError: true };
  }
  return { props: properties };
};
