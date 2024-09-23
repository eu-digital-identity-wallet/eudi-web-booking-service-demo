import Sidebar from "@/client/components/atoms/Sidebar";
import CarInformation from "@/client/components/molecules/CarInformation";
import Modal from "@/client/components/molecules/Modal";
import ReservationConfirmation from "@/client/components/molecules/ReservationConfirmation";
import HotelLocation from "@/client/components/organisms/HotelLocation";
import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import { deviceDetect } from "@/helpers/deviceDetect";
import { BookingService } from "@/server";
import { Box, Grid, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import QRCode from "react-qr-code";
import Container from "typedi";

export default function ConfirmationPage(props: AppProps) {
  const { bookingID, deviceType, hasError, ...bookingDetails } =
    props.pageProps;
  const { issueConfirmationRes } = useBookingStore();
  const { changeModalStatus } = useAppStore();
  if (hasError) {
    return <Box>Booking not found</Box>;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: "100%", pb: 1, pt: 1, pl: 3, pr: 3 }}>
      <Modal
        title="Scan to issue your reservation confirmation to EUDI Wallet"
        content={
          <Box>
            {issueConfirmationRes && (
              <Box>
                {issueConfirmationRes?.url && (
                  <QRCode value={issueConfirmationRes.url} size={333} />
                )}
                {issueConfirmationRes?.otp && (
                  <Typography variant="h5" color="textPrimary">
                    OTP: {issueConfirmationRes.otp}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        }
        handleClose={() => {
          changeModalStatus(ModalStatus.CLOSE);
        }}
      />

      <HotelLocation />

      <Box sx={{ width: "100%", mx: "auto" }}>
        <Grid container>
          <Grid item sm={12} md={5}>
            <ReservationConfirmation
              details={bookingDetails}
              id={bookingID}
              deviceType={deviceType}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            {bookingDetails.carRental && <CarInformation />}
          </Grid>
          <Grid sx={{ width: "100%" }} item md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Use dynamic id from the URL
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const deviceType = deviceDetect(context.req.headers["user-agent"] ?? "");

  // Extract id from URL params
  const { id: bookingID } = context.params as { id: string };
  // Extract request_code from query parameters
  const { response_code } = context.query;
  const responseCode = Array.isArray(response_code)
    ? response_code[0]
    : response_code;

  const bookingService = Container.get(BookingService);
  let properties = {};
  try {
    if (responseCode) {
      // Trigger the booking service with the request_code
      const verify = await bookingService.bookingVerificationStatus({
        bookingID,
        responseCode,
      });

      if (verify) {
        // If verification is successful, redirect to the same page without `request_code`
        const { res, resolvedUrl } = context;

        // Remove request_code from the query parameters and redirect
        const urlWithoutRequestCode = new URL(
          resolvedUrl,
          `http://${context.req.headers.host}`
        );
        urlWithoutRequestCode.searchParams.delete("response_code"); // Remove the request_code param

        // Perform the redirect using Next.js' server-side methods
        res.writeHead(302, {
          Location:
            urlWithoutRequestCode.pathname + urlWithoutRequestCode.search,
        });
        res.end();
        return { props: {} }; // You must return empty props here because of the redirection
      } else {
        // If verification fails, return hasError
        return { notFound: true };
      }
    }

    const bookingDetails = await bookingService.bookingDetails(bookingID);

    if (bookingDetails) {
      properties = {
        bookingID,
        deviceType,
        ...bookingDetails,
        hasError: false,
      };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    return { notFound: true };
  }
  return { props: properties };
};
