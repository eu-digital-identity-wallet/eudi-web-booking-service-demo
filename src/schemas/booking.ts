import { z } from "zod";

const isISODate = (dateString: string): boolean => {
  const isoDatePattern =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z$/;
  return isoDatePattern.test(dateString);
};

export const bookingIdSchema =  z.string().cuid({ message: "Invalid bookingId format" });


export const bookingCreateDtoValidationSchecma = z.object({
  hotel: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  numberOfGuests: z.number().min(1).max(10),
  numberOfRooms: z.number().min(1).max(10),
  checkIn: z.string().refine(isISODate, {
    message: "Invalid date format. Must be ISO 8601 date string.",
  }),
  checkOut: z.string().refine(isISODate, {
    message: "Invalid date format. Must be ISO 8601 date string.",
  }),
}).strict();  // strict mode to disallow extra fields

export const bookingCreateSchema = z.object({
  hotel: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  crossDeviceTransactionId: z.string().optional(),
  sameDeviceTransactionId: z.string().optional(),
  numberOfGuests: z.number().min(1).max(10),
  numberOfRooms: z.number().min(1).max(10),
  checkIn: z.string().refine(isISODate, {
    message: "Invalid date format. Must be ISO 8601 date string.",
  }),
  checkOut: z.string().refine(isISODate, {
    message: "Invalid date format. Must be ISO 8601 date string.",
  }),
});

export const bookingUpdateSchema = bookingCreateSchema.extend({
  id: z.string().optional(),
})