import { apiFetch } from "@/helpers/apiFetch";
import { BookingCreateResponse, IBookingStore } from "@/interfaces";
import { BookingCreateDto } from "@/shared";
import { create } from "zustand";
import { handleError, setLoadingAndError } from "./utils";

export const useBookingStore = create<IBookingStore>()((set, get) => ({
  isLoading: false,
  error: null,

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

      set({ verUrl: res.url });
      setLoadingAndError(set, false);
    } catch (err) {
      handleError(set, err);
    }
  },
}));
