import BookingConfirmation from "@/client/components/confirmation";
import { BookingService } from "@/server";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Container from "typedi";

export default function ConfirmationPage(props: AppProps) {
  const { id, ...rest } = props.pageProps;
  if (Object.keys(rest).length === 0) {
    return (
      <div className='text-black text-lg font-bold p-4 '>Booking not found</div>
    );
  }
  return <BookingConfirmation details={rest} id={id} />;
}

// Use dynamic id from the URL
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params as { id: string };
  const bookingService = Container.get(BookingService);
  const response = await bookingService.bookingDetails(id);
  return {
    props: {
      id,
      ...response,
    },
  };
};
