import { PATHS } from "@/client/constants";
import { bookingService } from "@/client/services/booking";
import { ModalStatus, useAppStore } from "@/client/store";
import { useBookingStore } from "@/client/store/bookingStore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export interface VerificationResponse {
  status: boolean;
}

const fetcher = (bookingId: string) =>
  bookingService.verifyBooking<VerificationResponse>(bookingId);

export const useBookingVerify = () => {
  const [status, setStatus] = useState(false);
  const [polling, setPolling] = useState(true);  // Polling state
  const { changeModalStatus, modal } = useAppStore(); // Get modal state
  const { resetBooking } = useBookingStore();
  const bookingId = useBookingStore(
    (state) => state.bookingCreateRes?.bookingId
  );
  const router = useRouter();

  // Reset polling and status when modal is reopened
  useEffect(() => {
    if (modal === ModalStatus.OPEN) {
      setPolling(true);  // Start polling when modal opens
      setStatus(false);   // Reset status
    }
  }, [modal]);

  // Use SWR for polling the status
  const { data, error } = useSWR(
    bookingId,
    fetcher,
    { refreshInterval: polling ? 1000 : 0 } // Poll every second if polling is true
  );

  // Function to stop polling manually
  const stopPolling = useCallback(() => {
    setPolling(false);  // Stop polling
    resetBooking();     // Reset booking data
    changeModalStatus(ModalStatus.CLOSE);  // Close modal
  }, [changeModalStatus, resetBooking]);

  // Handle polling logic and state changes
  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred during verification.");
      stopPolling(); // Stop polling if an error occurs
    }

    if (data?.status && bookingId) {
      setStatus(true);     // Mark the status as verified
      stopPolling();       // Stop polling after success
      router.push(PATHS.confirmation(bookingId));  // Navigate to confirmation page
    }

    // Timeout logic to stop polling after 30 seconds
    const timeout = setTimeout(() => {
      stopPolling(); // Stop polling after 30 seconds
    }, 30000);

    return () => {
      clearTimeout(timeout); // Clear timeout on unmount
    };
  }, [data, bookingId, stopPolling, router, error]);

  return { status, error, stopPolling };
};
