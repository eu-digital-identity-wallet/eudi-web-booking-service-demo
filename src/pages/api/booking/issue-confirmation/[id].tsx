import { BookingService } from "@/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookingService = Container.get(BookingService); // Inject the service at the handler level

  // Allow only GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    // Check if ID is provided and is a valid PostgreSQL numeric ID
    if (!id) {
      return res.status(400).json({ error: "Valid numeric ID is required" });
    }

    // Attempt to issue the confirmation
    const bookingIssueConfirmation =
      await bookingService.bookingIssueConfirmation(id);

    // If no booking confirmation is returned, handle it gracefully
    if (!bookingIssueConfirmation) {
      return res
        .status(404)
        .json({ error: "Booking not found or unable to issue confirmation" });
    }

    return res.status(200).json(bookingIssueConfirmation);
  } catch (error) {
    // Log error with more context
    console.error(
      `Error issuing booking confirmation for ID ${req.query.id}:`,
      error
    );

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
