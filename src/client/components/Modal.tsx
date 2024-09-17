import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import QRCode from "react-qr-code";
import { useBookingVerify } from "../hooks/useBookingVerify";

const Modal: React.FC = () => {
  const { modal } = useAppStore();

  const { bookingCreateRes } = useBookingStore();

  const { stopPolling } = useBookingVerify();

  const handleCloseModal = () => {
    stopPolling();
  };

  if (modal === ModalStatus.CLOSE) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 flex-col rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-black  text-2xl font-bold mb-4">
          Verify your credentials
        </h2>
        <p className="text-black flex justify-center mb-4">
          {bookingCreateRes?.url && <QRCode value={bookingCreateRes.url} />}
        </p>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
