import { bookingDtoSchema } from "@/server/schemas";
import { z } from "zod";

//this is what user can submit
export type BookingDto = z.infer<typeof bookingDtoSchema>;

export type BookingDetailsDto = BookingDto & {
    guestFamilyName: string | null;
    guestGivenName: string | null;
    guestDateOfBirth: string | null; // Can be Date or ISO string based on your usage
    reservationDate: string;  
};