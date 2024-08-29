import usePolling from "@/helpers/usePolling";
import useAppStore, { ModalStatus } from "@/store/appStore";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";

const Modal: React.FC = () => {
  const { modal, changeModalStatus } = useAppStore();
  const router = useRouter();

  const { verUrl, bookingId, verificationResStatus, verifyBooking } =
    useBookingStore();
  const { data, error, loading, stopPolling, startPolling } =
    usePolling(verifyBooking);
  useEffect(() => {
    if (bookingId && !verificationResStatus) {
      startPolling(); // Start polling when the component mounts
    }
    return () => {
      stopPolling();
    };
  }, [bookingId, verificationResStatus, stopPolling, startPolling]);

  useEffect(() => {
    if (verificationResStatus === true) {
      changeModalStatus();
      router.push(`/confirmation`); // Navigate to the new post page
    }
  }, [changeModalStatus, router, verificationResStatus]);

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
