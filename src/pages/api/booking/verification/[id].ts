import { BookingService } from "@/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure only GET requests are allowed
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // Inject the booking service
  const bookingService = Container.get(BookingService);

  try {
    // Extract and validate the ID query parameter
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    // Check if ID is provided and is a valid PostgreSQL numeric ID
    if (!id) {
      return res.status(400).json({ error: "Valid numeric ID is required" });
    }

    // Fetch the booking verification status from the service
    const bookingVerificationStatus =
      await bookingService.bookingVerificationStatus(id);

    // Handle cases where no status is returned (assuming this might happen)
    if (
      bookingVerificationStatus === null ||
      bookingVerificationStatus === undefined
    ) {
      return res.status(404).json({ error: "Booking status not found" });
    }

    // Return the booking status
    return res.status(200).json({ status: bookingVerificationStatus });
  } catch (error) {
    // Log the error with more context for debugging
    console.error(
      `Error retrieving booking verification status for ID ${req.query.id}:`,
      error
    );

    // Respond with a 500 Internal Server Error
    return res.status(500).json({ error: "Failed to retrieve booking status" });
  }
}
