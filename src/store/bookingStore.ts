import { apiFetch } from "@/helpers/apiFetch";
import { BookingCreateResponse, IBookingStore } from "@/interfaces";
import { VerificationResponse } from "@/interfaces/VerificationResponse";
import { BookingCreateDto } from "@/shared";
import { create } from "zustand";
import { handleError, setLoadingAndError } from "./utils";

export const useBookingStore = create<IBookingStore>()((set, get) => ({
  isLoading: false,
  error: null,
  verificationResStatus: false,
  createBooking: async (newBooking: BookingCreateDto) => {
    try {
      setLoadingAndError(set, true);
      const res = await apiFetch.post<BookingCreateDto, BookingCreateResponse>(
        "api/booking/create",
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        verUrl: res.url,
        ...(res.bookingId && { bookingId: res.bookingId }),
      });
      setLoadingAndError(set, false);
    } catch (err) {
      handleError(set, err);
    }
  },

  verifyBooking: async () => {
    try {
      const bookingId = get().bookingId;
      setLoadingAndError(set, true);
      const res = await apiFetch.get<VerificationResponse>(
        `api/booking/verification/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({ verificationResStatus: res.status });
      setLoadingAndError(set, false);
    } catch (err) {
      handleError(set, err);
    }
  },
}));
