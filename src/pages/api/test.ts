import { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT, jwtVerify } from 'jose';
import { createPrivateKey, createPublicKey } from 'crypto';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Load private and public keys
    const privateKey = createPrivateKey(fs.readFileSync('./tmp/private.key', 'utf8'));
    const publicKey = createPublicKey( fs.readFileSync('./tmp/public_cert.pem', 'utf8'));
    
    // Load the certificate and encode it for the x5c header
    const cert = fs.readFileSync('./tmp/public_cert.pem', 'utf8')
    .toString()
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\n/g, ''); // Remove newlines and headers

    /*
    .booking_service_name	The booking service providing the booking reservation.	M	tstr
    .reservation_id	The identifier of the booking reservation from the booking service.	M	tstr
    .reservation_date	Date of the reservation.	M	tdate
    .service_provider_name	The name of the service provider (e.g. Hotel) the reservation refers to.	M	tstr
    .location	The location or place the reservation refers to (e.g. city, service provider place, etc.).	M	tstr
    .check_in_date	The check-in date for the reservation.	M	tdate
    .check_out_date	The check-out date for the reservation.	M	tdate
    .guests	The guest of the reservation (number of adults, number of children, etc.).	M	tstr
    .car_plate	The registration plate of the car included in the reservation.	M	tstr
    .family_name	Current last name(s) or surname(s) of the holder.	M	tstr
    .given_name	Current first name(s), including middle name(s), of the holder.	M	tstr
    .birth_date	Day, month, and year on which the holder was born.	M	full-date

    */
  // JWT Payload
  const payload = {
    iss: "http://localhost:3000", // TODO public url tis efarmogis mas 
    aud : "https://dev.issuer.eudiw.dev", // TODO : env varialble 
    grants : ["urn:ietf:params:oauth:grant-type:pre-authorized_code"],
    credentials: [
        {
            credential_configuration_id : "org.iso.18013.5.1.reservation_mdoc",
            "data" : 
            {        
                booking_service_name: 'utopia-website',
                service_provider_name: 'utopia',
                location: 'koufonisia, greece',
                reservation_id: 'cm0domdoz0007127g5shr6vcv', // TODO
                reservation_date  : '21/09/2024', // TODO
                check_in_date : '30/11/2024', // TODO
                check_out_date : '31/11/204', // TODO
                num_of_rooms:2, // TODO
                guests: 4,  // TODO 
                car_plate:'NBP3012', // TODO
                family_name:'Nikolopoulos', // TODO 
                given_name:'Ioannis', // TODO 
                birth_date:'12/12/1952' // TODO
            }
        }
    ],
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes from now
  };

  // Create the JWT with ES256
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({
        alg: 'ES256',
        x5c: [cert]  // Add x5c with the base64 encoded certificate
    })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(privateKey);

  console.log('JWT:', jwt);

/*
 curl -b -L --location 'https://dev.issuer.eudiw.dev/credentialOfferReq' -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'request=eyJhbGciOiJFUzI1NiIsIng1YyI6WyJNSUlCOHpDQ0FabWdBd0lCQWdJVUQwMGNSdFE0aW9ZWUlReGpzNDErMm5UTjdBQXdDZ1lJS29aSXpqMEVBd0l3VHpFTE1Ba0dBMVVFQmhNQ1JWVXhDekFKQmdOVkJBZ01Ba1ZWTVFzd0NRWURWUVFIREFKRlZURVBNQTBHQTFVRUNnd0dSVlZFU1ZjZ01SVXdFd1lEVlFRTERBeGliMjlyYVc1bklHUmxiVzh3SGhjTk1qUXdPVEEyTVRVeE1USXdXaGNOTWpVd09UQTJNVFV4TVRJd1dqQlBNUXN3Q1FZRFZRUUdFd0pGVlRFTE1Ba0dBMVVFQ0F3Q1JWVXhDekFKQmdOVkJBY01Ba1ZWTVE4d0RRWURWUVFLREFaRlZVUkpWeUF4RlRBVEJnTlZCQXNNREdKdmIydHBibWNnWkdWdGJ6QlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJIeCtwTXh0T1JlUlR4R3Nvdy9UelljeFRScnRDRXhHdXhOUFRBSUFIVXB0VC9QSE5JRi9sUUZqWUt0UktGZEFlUFJFeUI4UDA0dGNJeCtSWXRhblpBT2pVekJSTUIwR0ExVWREZ1FXQkJTZzVIMFVmZkMwSk9la3BDWDRUbG9ua1Vxejd6QWZCZ05WSFNNRUdEQVdnQlNnNUgwVWZmQzBKT2VrcENYNFRsb25rVXF6N3pBUEJnTlZIUk1CQWY4RUJUQURBUUgvTUFvR0NDcUdTTTQ5QkFNQ0EwZ0FNRVVDSVFEclpaR2dZaVNaYzV0RytPS0ozcEExN3BCSnhSQjNHYXRoUmJsbjJBRUQyZ0lnQ2JSVy9jR1RCaE1PdHphOHg2YkRsUU9ocnYwZWYrdWV4Vm5TNk9UelVPaz0iXX0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJhdWQiOiJodHRwczovL2Rldi5pc3N1ZXIuZXVkaXcuZGV2IiwiZ3JhbnRzIjpbInVybjppZXRmOnBhcmFtczpvYXV0aDpncmFudC10eXBlOnByZS1hdXRob3JpemVkX2NvZGUiXSwiY3JlZGVudGlhbHMiOlt7ImNyZWRlbnRpYWxfY29uZmlndXJhdGlvbl9pZCI6Im9yZy5pc28uMTgwMTMuNS4xLnJlc2VydmF0aW9uX21kb2MiLCJkYXRhIjp7ImJvb2tpbmdfc2VydmljZV9uYW1lIjoidXRvcGlhLXdlYnNpdGUiLCJzZXJ2aWNlX3Byb3ZpZGVyX25hbWUiOiJ1dG9waWEiLCJsb2NhdGlvbiI6ImtvdWZvbmlzaWEsIGdyZWVjZSIsInJlc2VydmF0aW9uX2lkIjoiY20wZG9tZG96MDAwNzEyN2c1c2hyNnZjdiIsInJlc2VydmF0aW9uX2RhdGUiOiIyMS8wOS8yMDI0IiwiY2hlY2tfaW5fZGF0ZSI6IjMwLzExLzIwMjQiLCJjaGVja19vdXRfZGF0ZSI6IjMxLzExLzIwNCIsIm51bV9vZl9yb29tcyI6MiwiZ3Vlc3RzIjo0LCJjYXJfcGxhdGUiOiJOQlAzMDEyIiwiZmFtaWx5X25hbWUiOiJOaWtvbG9wb3Vsb3MiLCJnaXZlbl9uYW1lIjoiSW9hbm5pcyIsImJpcnRoX2RhdGUiOiIxMi8xMi8xOTUyIn19XSwiaWF0IjoxNzI1OTgxMjQ0LCJleHAiOjE3MjU5ODE1NDR9.GEIbOdhU1E-JWtISI1J6rwHmdiK90HAjYVxl_iXtuABCqAIs3d3KdbJXwEExk5xKNSNSqee_8D6vgT1KIU_zUQ' | jq . 

*/
  //TODO openid-credential-offer://?credential_offer=urlencode(response from issuer) 

  // Verify the JWT using the public key
  try {
    const { payload: verifiedPayload } = await jwtVerify(jwt, publicKey);
    console.log('Verified payload:', verifiedPayload);

    res.status(200).json({ jwt, isValid: true, verifiedPayload });
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ jwt, isValid: false });
  }
}
