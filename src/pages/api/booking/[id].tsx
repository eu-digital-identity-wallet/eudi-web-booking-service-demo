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
      const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }
      const booking = await bookingService.bookingDetails(id);
      return res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve bookings" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}