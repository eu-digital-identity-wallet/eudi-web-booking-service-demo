import { bookingService } from "@/client/services/booking";
import { ModalStatus, useAppStore } from "@/client/store";
import { BookingDto } from "@/shared";
import { BookingCreateResponse, IssueConfirmationRespone } from "@/shared/interfaces";
import { create } from "zustand";

export interface FetchError {
  message: string;
}

export interface IBookingStore {
  bookingCreateRes?: BookingCreateResponse;
  isLoading: boolean;
  error: FetchError | null;
  issueConfirmationRes?: IssueConfirmationRespone;
  createBookingAsync: (newBooking: BookingDto) => Promise<void>;
  resetBooking: () => void;
  issueConfirmationAsync: (id:string) => Promise<void>;
}

const initialState: Omit<IBookingStore, "createBookingAsync" | "resetBooking" | "issueConfirmationAsync"> =
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
  issueConfirmationAsync: async (id) => {
    set({ isLoading: true });
    try {
      const res = await bookingService.issueConfirmationBooking<IssueConfirmationRespone>(  id  );
       
      set({ isLoading: false, issueConfirmationRes: res });
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
}
}));
