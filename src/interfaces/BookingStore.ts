import { BookingCreateDto } from "@/shared";
import { FetchError } from "./FetchError";

export interface IBookingStore {
  verUrl?: string;
  bookingId?: string;
  verificationResStatus: boolean;
  isLoading: boolean;
  error: FetchError | null;
  createBooking: (newBooking: BookingCreateDto) => Promise<void>;
  verifyBooking: () => Promise<void>;
}
