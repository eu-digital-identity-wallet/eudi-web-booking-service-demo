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
      const bookings = await bookingService.findAll();
      console.log("bookings", bookings);

      return res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve bookings" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
