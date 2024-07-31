import { BookingService } from "@/server";
import axios from "axios";
import { NextResponse } from "next/server";
import Container from "typedi";

const bookingService = Container.get(BookingService);

export async function GET() {
  const bookings = await bookingService.findAll();
  console.log("bookings", bookings);

  const payload = {
    type: "vp_token",
    presentation_definition: {
      id: "876a562d-3a45-4fde-90b6-7a2b806a156e",
      input_descriptors: [
        {
          id: "eu.europa.ec.eudi.pid.1",
          name: "EUDI PID",
          purpose: "We need to verify your identity",
          format: {
            mso_mdoc: {
              alg: ["ES256", "ES384", "ES512"],
            },
          },
          constraints: {
            fields: [
              {
                path: ["$['eu.europa.ec.eudi.pid.1']['family_name']"],
                intent_to_retain: false,
              },
            ],
          },
        },
      ],
    },
    nonce: "eaaace85-4d77-45dc-b57a-9043a548ab86",
  };

  try {
    const response = await axios.post(
      "https://dev.verifier-backend.eudiw.dev/ui/presentations",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error making the POST request:",
      (error as any).response ? (error as any).response.data : error.message
    );
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: error.response ? error.response.status : 500 }
    );
  }
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
