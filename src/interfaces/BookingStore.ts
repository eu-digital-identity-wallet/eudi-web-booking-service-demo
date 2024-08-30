import { BookingCreateDto } from "@/shared";
import { BookingCreateResponse } from "./BookingCreateResponse";
import { FetchError } from "./FetchError";

export interface IBookingStore {
  bookingCreateRes?: BookingCreateResponse;
  isBookingCreateLoading: boolean;
  bookingCreateError: FetchError | null;

  verificationResStatus: boolean;
  isVerifyLoading: boolean;
  verifyError: FetchError | null;

  createBookingAsync: (newBooking: BookingCreateDto) => Promise<void>;
  verifyBookingAsync: () => Promise<void>;
}
