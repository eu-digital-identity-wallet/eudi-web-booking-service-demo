import { BookingCreateDto } from "@/shared";
import { FetchError } from "./FetchError";

export interface IBookingStore {
  verUrl?: string;
  isLoading: boolean;
  error: FetchError | null;
  createBooking: (newBooking: BookingCreateDto) => Promise<void>;
}
