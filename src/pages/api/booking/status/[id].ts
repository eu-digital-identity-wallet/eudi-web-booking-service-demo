import { BookingService } from "@/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";

const bookingService = Container.get(BookingService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the HTTP method
  if (req.method === "GET") {
    try {
      // TODO: return data for specific ID
      const bookingStatus = await bookingService.bookingStatus();
      console.log("bookings", bookingStatus);

      return res.status(200).json(bookingStatus);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve booking status" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
