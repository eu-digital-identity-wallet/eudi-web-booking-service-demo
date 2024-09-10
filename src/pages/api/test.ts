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
