import { deviceDetect } from "@/helpers/deviceDetect";
import { BookingService } from "@/server/services";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";
 
// Get the booking service instance
const bookingService = Container.get(BookingService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} is not allowed` });
  }

  try {
    // Parse and validate incoming data
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const isMobile = deviceDetect(req.headers['user-agent'])==="mobile";
    
    // Create a booking
    const booking = await bookingService.create(data,isMobile);
    return res.status(201).json(booking);

  }catch (error: any) {
    console.error("Booking creation failed:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to create booking. Please try again later." });
  }
}