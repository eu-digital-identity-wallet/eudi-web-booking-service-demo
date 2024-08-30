import { apiFetch } from "@/helpers/apiFetch";
import { BookingCreateResponse, IBookingStore } from "@/interfaces";
import { VerificationResponse } from "@/interfaces/VerificationResponse";
import { BookingCreateDto } from "@/shared";
import { create } from "zustand";
import useAppStore from "./appStore";

const initialState: Omit<
  IBookingStore,
  "createBookingAsync" | "verifyBookingAsync"
> = {
  isBookingCreateLoading: false,
  bookingCreateError: null,

  verificationResStatus: false,
  isVerifyLoading: false,
  verifyError: null,
};

export const useBookingStore = create<IBookingStore>()((set, get) => ({
  ...initialState,
  createBookingAsync: async (newBooking: BookingCreateDto) => {
    set({ isBookingCreateLoading: true });

    try {
      const res = await apiFetch.post<BookingCreateDto, BookingCreateResponse>(
        "api/booking/create",
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ isBookingCreateLoading: false, bookingCreateRes: res });

      useAppStore.getState().changeModalStatus();
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      set({
        isBookingCreateLoading: false,
        bookingCreateError: { message: errorMessage },
      });
    }
  },

  verifyBookingAsync: async () => {
    set({ isVerifyLoading: true });

    try {
      const bookingId = get().bookingCreateRes?.bookingId;

      const res = await apiFetch.get<VerificationResponse>(
        `api/booking/verification/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ isVerifyLoading: false, verificationResStatus: res.status });
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      set({
        isVerifyLoading: false,
        verifyError: { message: errorMessage },
      });
    }
  },
}));
