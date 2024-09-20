import { z } from "zod";

const isISODate = (dateString: string): boolean => {
  const isoDatePattern =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z$/;
  return isoDatePattern.test(dateString);
};

export const bookingIdSchema = z
  .string()
  .cuid({ message: "Invalid bookingId format" });

export const bookingVerificationSchema = z.object({
  bookingID: z.string().cuid({ message: "Invalid bookingID format" }),
  responseCode: z.string().optional(),  // request_code is now optional
});

export const bookingDtoSchema = z
  .object({
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
    carRental: z.boolean(), 
  })
  .strict()
  .superRefine((data, ctx) => {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    if (checkOutDate <= checkInDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Check-out date must be later than check-in date.",
        path: ["checkOut"], // Path for the specific field causing the error
      });
    }
  }); // strict mode to disallow extra fields
