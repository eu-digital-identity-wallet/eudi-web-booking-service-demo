import { IssueConfirmationRespone } from "@/shared/interfaces";
import { createPrivateKey, createPublicKey } from "crypto";
import { Service } from "typedi";
import fs from 'fs';
import { Booking } from "@prisma/client";
import { SignJWT } from "jose";
 
type JWTPayload = {
  iss: string;  // Issuer URL
  aud: string;  // Audience URL
  grants: string[];  // Array of grant types
  credentials: {
    credential_configuration_id: string;  // ID of the credential configuration
    data: {
      booking_service_name: string;
      service_provider_name: string;
      location: string;
      reservation_id: string;
      reservation_date: string;  // Date as a string (you can convert to a Date type if needed)
      check_in_date: string;  // Check-in date as a string (you can convert to a Date type if needed)
      check_out_date: string;  // Check-out date as a string (you can convert to a Date type if needed)
      num_of_rooms: number;
      guests: number;
      car_rental: boolean;  // True/false for car rental
      family_name: string;
      given_name: string;
      birth_date: string;  // Birth date as a string (you can convert to a Date type if needed)
    };
  }[];
  iat: number;  // Issued At (in seconds since epoch)
  exp: number;  // Expiry (in seconds since epoch)
};

@Service()
export class IssuerService {
  public async issueConfirmation(
    booking: Booking
  ): Promise<IssueConfirmationRespone> {
    if( !booking.guestFamilyName || !booking.guestGivenName  || ! booking.guestDateOfBirth  ){
      throw new Error('Personal info missing');
    }
    // Load private and public keys
    const privateKey = createPrivateKey(fs.readFileSync('./tmp/private.key', 'utf8'));
    const publicKey = createPublicKey( fs.readFileSync('./tmp/public_cert.pem', 'utf8'));
    
    // Load the certificate and encode it for the x5c header
    const cert = fs.readFileSync('./tmp/public_cert.pem', 'utf8')
    .toString()
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\n/g, ''); // Remove newlines and headers
    
    const jwtPayload: JWTPayload = {
      iss: "http://localhost:3000", // TODO public url tis efarmogis mas 
      aud : "https://dev.issuer.eudiw.dev", // TODO : env varialble 
      grants : ["urn:ietf:params:oauth:grant-type:pre-authorized_code"],
      credentials: [
          {
              credential_configuration_id : "org.iso.18013.5.1.reservation_mdoc",
              "data" : 
              {        
                  booking_service_name: booking.hotel+'-website',
                  service_provider_name: booking.hotel,
                  location: booking.location,
                  reservation_id: booking.id, 
                  reservation_date  : booking.reservationDate.toISOString(),  
                  check_in_date : booking.checkIn.toISOString(),  
                  check_out_date : booking.checkOut.toISOString(),  
                  num_of_rooms: booking.numberOfRooms,  
                  guests: booking.numberOfGuests,   
                  car_rental: booking.carRental,
                  family_name: booking.guestFamilyName, 
                  given_name: booking.guestGivenName, 
                  birth_date: booking.guestDateOfBirth?.toDateString() 
              }
          }
      ],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes from now
    };

    // Create the JWT with ES256
    const jwt = await new SignJWT(jwtPayload)
      .setProtectedHeader({
          alg: 'ES256',
          x5c: [cert]  // Add x5c with the base64 encoded certificate
      })
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(privateKey);

    console.log('JWT:', jwt);

    const requestBody = new URLSearchParams();
    requestBody.append('request', jwt);

    try {
      const response = await fetch('https://dev.issuer.eudiw.dev/credentialOfferReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(), 
      });
          
      console.log(response);

    } catch (error) {
      console.error(error)
    }


    const requestUri = `eudi-openid4vp://?`;

    return { requestUri };
  }
 
}
