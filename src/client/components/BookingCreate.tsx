import { ModalStatus, useAppStore } from "@/client/store";
import BookingForm from "./BookingForm";
import HotelDescription from "./HotelDescription";
import HotelLocation from "./HotelLocation";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

const BookingCreate: React.FC = () => {
  const { modal } = useAppStore();

  return (
    <div className="max-w-[1240px] max-md:max-w-full mx-auto">
      {modal === ModalStatus.OPEN && <Modal />}
      <HotelLocation />
      <div className="self-center px-5 mt-8 w-full max-w-[1239px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <BookingForm />
          <HotelDescription />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default BookingCreate;
