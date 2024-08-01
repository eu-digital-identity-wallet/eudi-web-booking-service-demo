import { BookingService } from "@/server";
import axios from "axios";
import { NextResponse } from "next/server";
import Container from "typedi";

const bookingService = Container.get(BookingService);

export async function GET() {
  const bookings = await bookingService.findAll();
  console.log("bookings", bookings);
   
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const booking = await bookingService.create(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
