/**
 * This code was generated by Builder.io.
 */
import useAppStore from "@/client/store/appStore";
import { useBookingStore } from "@/client/store/bookingStore";
import { Hotel } from "@/shared";
import React from "react";

const HotelDescription: React.FC = () => {
  const deviceType = useAppStore((state) => state.deviceType);
  const { isLoading, createBookingAsync } = useBookingStore();
  const handleBooking = async () => {
    await createBookingAsync({
      hotel: Hotel.name,
      location: Hotel.location,
      numberOfGuests: 5,
      numberOfRooms: 2,
      checkIn: "2024-08-26T14:30:00.123Z",
      checkOut: "2024-08-27T14:30:00.123Z",
      carRental: true,
    });
  };
  return (
    <section className='flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full'>
      <div className='flex flex-col text-xs max-md:mt-10 max-md:max-w-full'>
        <p className='text-foreground  max-md:max-w-full'>
          {Hotel.name} Hotel has a garden, terrace, a restaurant and bar in
          Brussels. With free WiFi, this 4-star hotel offers room service and a
          24-hour front desk. There is a spa and wellness centre with an outdoor
          swimming pool, indoor pool and fitness centre, as well as a sauna.
          <br />
          <br />
          The hotel will provide guests with air-conditioned rooms offering a
          desk, a kettle, a fridge, a safety deposit box, a flat-screen TV and a
          private bathroom with a shower. Some rooms include a kitchenette with
          a dishwasher, an oven and a microwave. At {Hotel.name} Hotel rooms
          come with bed linen and towels.
          <br />
          <br />
          The accommodation offers a buffet or continental breakfast. The
          wellness area at {Hotel.name} Hotel is comprised of a hot tub and a
          hammam.
          <br />
          <br />
        </p>
        <div className='justify-center p-2 mt-9 max-w-full font-bold rounded bg-neutral-50 text-black text-opacity-90 w-[312px]'>
          To continue booking your travel plan, issue the requested credentials
          using EUDI Wallet:
        </div>
        <div className='flex gap-2 justify-center py-2 pr-20 mt-3 text-sm text-center text-white bg-white max-md:flex-wrap max-md:pr-5'>
          {deviceType === "mobile" ? (
            <button className='flex flex-col justify-center px-2 py-4 bg-sky-600 rounded-sm'>
              <div>Book using EUDI Wallet</div>
              <img
                loading='lazy'
                src='/images/eudiwallet.svg'
                className='self-center mt-2 w-12 aspect-[1.41]'
                alt='EUDI Wallet'
              />
            </button>
          ) : (
            <button
              onClick={handleBooking}
              className='flex flex-col justify-center px-2 py-4 bg-sky-600 rounded-sm max-md:px-5'
            >
              <div className='flex items-center'>
                {isLoading && (
                  <svg
                    className='animate-spin h-5 w-5 text-white mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z'
                    ></path>
                  </svg>
                )}
                <div>Scan QR code</div>
              </div>
              <img
                loading='lazy'
                src='/images/qrcode.svg'
                className='self-center mt-2 aspect-square w-[41px]'
                alt='QR Code'
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelDescription;
