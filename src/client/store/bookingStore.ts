import { bookingService } from "@/client/services/booking";
import { BookingDto } from "@/shared";
import { BookingCreateResponse } from "@/shared/interfaces";
import { create } from "zustand";
import useAppStore, { ModalStatus } from "./appStore";

export interface FetchError {
  message: string;
}

export interface IBookingStore {
  bookingCreateRes?: BookingCreateResponse;
  isLoading: boolean;
  error: FetchError | null;

  createBookingAsync: (newBooking: BookingDto) => Promise<void>;
  resetBooking: () => void;
}

const initialState: Omit<IBookingStore, "createBookingAsync" | "resetBooking"> =
  {
    isLoading: false,
    error: null,
  };

export const useBookingStore = create<IBookingStore>()((set) => ({
  ...initialState,
  createBookingAsync: async (newBooking: BookingDto) => {
    set({ isLoading: true });
    try {
      const res = await bookingService.createBooking<BookingCreateResponse>(
        newBooking
      );
      set({ isLoading: false, bookingCreateRes: res });

      useAppStore.getState().changeModalStatus(ModalStatus.OPEN);
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      set({
        isLoading: false,
        error: { message: errorMessage },
      });
    }
  },
  resetBooking: () => set({ ...initialState }),
}));
