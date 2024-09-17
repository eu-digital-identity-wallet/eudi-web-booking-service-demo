export type JWTPayload = {
  iss: string; // Issuer URL
  aud: string; // Audience URL
  grants: string[]; // Array of grant types
  credentials: {
    credential_configuration_id: string; // ID of the credential configuration
    data: {
      booking_service_name: string;
      service_provider_name: string;
      location: string;
      reservation_id: string;
      reservation_date: string; // Date as a string (you can convert to a Date type if needed)
      check_in_date: string; // Check-in date as a string (you can convert to a Date type if needed)
      check_out_date: string; // Check-out date as a string (you can convert to a Date type if needed)
      num_of_rooms: number;
      guests: number;
      car_rental: boolean; // True/false for car rental
      family_name: string;
      given_name: string;
      birth_date: string; // Birth date as a string (you can convert to a Date type if needed)
    };
  }[];
  iat: number; // Issued At (in seconds since epoch)
  exp: number; // Expiry (in seconds since epoch)
};
