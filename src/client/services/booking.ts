import { apiFetch } from "@/helpers";
import { BookingDto } from "@/shared";
import { URLS } from "../constants";

const createBooking = <T>(newBooking: BookingDto) => {
  return apiFetch.post<BookingDto, T>(URLS.create, newBooking, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const verifyBooking = async <T>(bookingId: string): Promise<T> => {
  return apiFetch
    .get<T>(URLS.verify(bookingId), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res);
};
export const bookingService = { createBooking, verifyBooking };
