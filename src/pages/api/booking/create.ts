import { BookingService } from "@/server/services";
import type { NextApiRequest, NextApiResponse } from "next";
import Container from "typedi";

const bookingService = Container.get(BookingService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await req.body;
      const booking = await bookingService.create(data);
      return res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create booking" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
