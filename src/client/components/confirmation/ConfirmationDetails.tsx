import { BookingDetailsDto } from "@/shared";
import CopyIcon from "../icons/CopyIcon";

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
  return (
    <div>
      <div className='p-2'>
        <h2 className='font-bold text-black text-xl'>
          🏨 Here is your reservation confirmation
        </h2>
      </div>
      {/* Hotel Details */}
      <div className='p-2'>
        <h2 className='text-green-600 text-xl font-bold'>{hotel}</h2>
        <div className='mt-2'>
          <div className='flex'>
            <div className='mr-20'>
              <p className='font-bold text-black'>Check-in</p>
              <p className='text-sky-600'>{checkIn}</p>
            </div>
            <div>
              <p className='font-bold text-black'>Check-out</p>
              <p className='text-sky-600'>{checkOut}</p>
            </div>
          </div>
          <p className='mt-4 font-bold text-black'>Rooms and guests</p>
          <p className='text-sky-600'>{`${numberOfRooms} Room, ${numberOfGuests} Guests`}</p>
        </div>

        {/* Reservation ID */}
        <div className='mt-6'>
          <div className='flex'>
            <p className='font-bold text-black'>YOUR RESERVATION ID:</p>
            <span className='flex font-bold ml-2 text-black'>
              {id}
              <button
                className='ml-3'
                onClick={() => navigator.clipboard.writeText(id)}
              >
                <CopyIcon className='pr-2 text-primary ' />
              </button>
            </span>
          </div>
          <div className='mt-3'>
            <p className='text-base text-black'>Reservation date</p>{" "}
            <p className='text-sky-600'>{reservationDate}</p>
          </div>
        </div>

        {/* issue confimation to EUDI wallet */}
        <div className='w-full mt-3 text-sm text-center text-white bg-white max-md:flex-wrap max-md:pr-5'>
          {deviceType === "mobile" ? (
            <button className='flex justify-betweem px-2 py-4 bg-sky-600 rounded-sm'>
              <img
                loading='lazy'
                src='/images/eudiwallet.svg'
                className='mt-2 w-12 aspect-[1.41] ml-4'
                alt='EUDI Wallet'
              />
              <div>Issue your reservation confirmation to EUDI Wallet</div>
            </button>
          ) : (
            <button
              onClick={() => console.log("acan qr code")}
              className='flex flex-col justify-center px-2 py-4 bg-sky-600 rounded-sm max-md:px-5'
            >
              <div className='flex items-center'>
                {/* //TODO change hardcoded value */}
                {false && (
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
                <div className='text-center'>
                  Issue your reservation confirmation to EUDI Wallet
                </div>
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
    </div>
  );
};

export default ConfirmationDetails;
