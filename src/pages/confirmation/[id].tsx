import BookingConfirmation from "@/client/components/confirmation";
import { deviceDetect } from "@/helpers/deviceDetect";
import { BookingService } from "@/server";
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
  return (
    <BookingConfirmation
      details={bookingDetails}
      id={id}
      deviceType={deviceType}
    />
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
