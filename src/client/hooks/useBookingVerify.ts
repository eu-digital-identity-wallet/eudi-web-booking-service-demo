import { PATHS } from "@/client/constants";
import { bookingService } from "@/client/services/booking";
import useAppStore, { ModalStatus } from "@/client/store/appStore";
import { useBookingStore } from "@/client/store/bookingStore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export interface VerificationResponse {
  status: boolean;
}

const fetcher = (token: string) =>
  bookingService.verifyBooking<VerificationResponse>(token);

export const useBookingVerify = () => {
  const [status, setStatus] = useState(false);
  const { changeModalStatus } = useAppStore();
  const { resetBooking } = useBookingStore();

  const token = useBookingStore((state) => state.bookingCreateRes?.bookingId);
  const [polling, setPolling] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const router = useRouter();

  // Use SWR for fetching the status
  const { data, error } = useSWR(
    token,
    fetcher,
    { refreshInterval: polling ? 5000 : 0 } // Poll every 5 seconds if polling is true
  );

  // Function to stop polling manually
  const stopPolling = useCallback(() => {
    setPolling(false);
    resetBooking();
    changeModalStatus(ModalStatus.CLOSE);
  }, [changeModalStatus, resetBooking]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred during verification.");
      stopPolling(); // Stop polling if an error occurs
    }

    if (data?.status) {
      setStatus(true);
      stopPolling(); // Stop polling if the status is true
      router.push(PATHS.confirmation); // Navigate to the new post page
    }

    // Handle timeout logic
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 5); // Increment time elapsed by 5 seconds

      if (timeElapsed >= 60) {
        // Stop after 1 minute
        stopPolling();
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [data, timeElapsed, stopPolling, router, error]);

  return { status, error, stopPolling };
};
