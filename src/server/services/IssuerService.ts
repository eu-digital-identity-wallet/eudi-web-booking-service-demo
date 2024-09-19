import { IssueConfirmationRespone } from "@/shared/interfaces";
import { Booking } from "@prisma/client";
import { Inject, Service } from "typedi";
import { JWTPayload } from "../types";
import { JWTService } from "./JWTService";
import { KeystoreService } from "./KeystoreService";

@Service()
export class IssuerService {
  constructor(
    @Inject() private readonly jwtService: JWTService,
    @Inject() private readonly keystoreService: KeystoreService
  ) {}

  public async issueConfirmation(
    booking: Booking
  ): Promise<IssueConfirmationRespone> {
    // Validate booking details
    if (
      !booking.guestFamilyName ||
      !booking.guestGivenName ||
      !booking.guestDateOfBirth
    ) {
      throw new Error("Booking is missing personal information");
    }

    // Load keystore and keys
    const { privateKey, cert } = this.keystoreService.loadKeystore();

    // Prepare the JWT payload
    const jwtPayload: JWTPayload = {
      iss: process.env.NEXT_PUBLIC_APP_URL!,
      aud: process.env.ISSUER_API_URL!,
      grants: ["urn:ietf:params:oauth:grant-type:pre-authorized_code"],
      credentials: [
        {
          credential_configuration_id: "org.iso.18013.5.1.reservation_mdoc",
          data: {
            booking_service_name: `${booking.hotel}-website`,
            service_provider_name: booking.hotel,
            location: booking.location,
            reservation_id: booking.id,
            reservation_date: booking.reservationDate.toISOString(),
            check_in_date: booking.checkIn.toISOString(),
            check_out_date: booking.checkOut.toISOString(),
            num_of_rooms: booking.numberOfRooms,
            guests: booking.numberOfGuests,
            car_rental: booking.carRental,
            family_name: booking.guestFamilyName,
            given_name: booking.guestGivenName,
            birth_date: booking.guestDateOfBirth?.toDateString(),
          },
        },
      ],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes from now
    };

    // Sign the JWT using the JWTService
    const jwt = await this.jwtService.sign(jwtPayload, privateKey, cert);

    // Prepare the request body
    const requestBody = new URLSearchParams();
    requestBody.append("request", jwt);

    // Perform the HTTP request to the issuer API
    try {
      const response = await fetch(
        `${process.env.ISSUER_API_URL}/credentialOfferReq2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: requestBody.toString(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      const otp =
        responseData.grants[
          "urn:ietf:params:oauth:grant-type:pre-authorized_code"
        ].tx_code.value;

      // Clean up the response data and remove sensitive tx_code
      const responseCopy = { ...responseData };
      delete responseCopy.grants[
        "urn:ietf:params:oauth:grant-type:pre-authorized_code"
      ].tx_code.value;

      const urlEncodedResponse = encodeURIComponent(
        JSON.stringify(responseCopy)
      );

      // Return the final object
      return {
        url: `openid-credential-offer://?credential_offer=${urlEncodedResponse}`,
        otp,
      };
    } catch (error) {
      console.error("Error issuing confirmation:", error);
      throw new Error("Failed to issue confirmation");
    }
  }
}
