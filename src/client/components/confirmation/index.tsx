import { BookingDetailsDto } from "@/shared";
import HotelLocation from "../HotelLocation";
import HotelImage from "../Sidebar";
import CarRentalDetails from "./CarRentalDetails";
import ConfirmationDetails from "./ConfirmationDetails";
type BookingConfirmationProps = {
  details: BookingDetailsDto;
  id: string;
  deviceType: string;
};
const BookingConfirmation = ({
  details,
  id,
  deviceType,
}: BookingConfirmationProps) => {
  console.log("details", details);

  return (
    <div className="max-w-[1240px] max-md:max-w-full mx-auto">
      <HotelLocation />
      {/* ----------------------- */}
      <div className="flex mx-auto bg-white w-full rounded-xl">
        {/* Left Section: Reservation & Car Rental */}
        <div className="w-2/4 p-2">
          <ConfirmationDetails
            details={details}
            id={id}
            deviceType={deviceType}
          />
        </div>

        <div className="w-1/4 p-2">
          {details.carRental && <CarRentalDetails />}
        </div>
        {/* Right Section: Reviews & Map */}
        <div className="w-1/4 p-2">
          <HotelImage />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
