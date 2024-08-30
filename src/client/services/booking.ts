import { apiFetch } from "@/helpers/apiFetch";
import { BookingCreateDto } from "@/shared";
import { URLS } from "../constants";

const createBooking = <T>(newBooking: BookingCreateDto) => {
  return apiFetch.post<BookingCreateDto, T>(URLS.create, newBooking, {
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
