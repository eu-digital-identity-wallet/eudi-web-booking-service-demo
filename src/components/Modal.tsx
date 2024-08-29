import useAppStore, { ModalStatus } from "@/store/appStore";
import { useBookingStore } from "@/store/bookingStore";
import React from "react";
import QRCode from "react-qr-code";

const Modal: React.FC = () => {
  const { modal, changeModalStatus } = useAppStore();
  const { verUrl } = useBookingStore();

  if (modal === ModalStatus.CLOSE) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 flex-col rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-black  text-2xl font-bold mb-4">Modal Title</h2>
        <p className="text-black flex justify-center mb-4">
          {verUrl && <QRCode value={verUrl} />}
        </p>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={changeModalStatus}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
