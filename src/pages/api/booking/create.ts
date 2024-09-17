import { deviceDetect } from "@/helpers/deviceDetect";
import { BookingService } from "@/server/services";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";

// Improved handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} is not allowed` });
  }

  // Inject the booking service
  const bookingService = Container.get(BookingService);

  try {
    // Parse and validate the request body
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res
        .status(400)
        .json({ error: "A valid request body is required" });
    }

    // Detect device type
    const userAgent = req.headers["user-agent"];
    const isMobile = deviceDetect(userAgent) === "mobile";

    // Create a booking using the booking service
    const booking = await bookingService.create(data, isMobile);

    // Return the newly created booking
    return res.status(201).json(booking);
  } catch (error: any) {
    // Enhanced logging with more context
    console.error("Booking creation failed:", {
      message: error.message,
      stack: error.stack,
      requestData: req.body,
    });

    // Return an appropriate error message to the client
    return res
      .status(500)
      .json({ error: "Failed to create booking. Please try again later." });
  }
}
