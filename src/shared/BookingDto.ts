import { bookingDtoSchema } from "@/server/schemas";
import { z } from "zod";

//this is what user can submit
export type BookingDto = z.infer<typeof bookingDtoSchema>;
