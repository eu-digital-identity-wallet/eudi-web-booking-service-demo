import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";

import { BookingDto, BookingDetailsDto } from "@/shared";
import { Booking } from "@prisma/client";

export const bookingMap = (mapper: Mapper) => {
  createMap<BookingDto, Booking>(
    mapper,
    "BookingDto",
    "Booking",
    forMember(
      (destination) => destination.hotel,
      mapFrom((source) => source.hotel)
    ),
    forMember(
      (destination) => destination.location,
      mapFrom((source) => source.location)
    ),
    forMember(
      (destination) => destination.numberOfGuests,
      mapFrom((source) => source.numberOfGuests)
    ),
    forMember(
      (destination) => destination.numberOfRooms,
      mapFrom((source) => source.numberOfRooms)
    ),
    forMember(
      (destination) => destination.checkIn,
      mapFrom((source) => new Date(source.checkIn))
    ),
    forMember(
      (destination) => destination.checkOut,
      mapFrom((source) => new Date(source.checkOut))
    ),
    forMember(
      (destination) => destination.carRental,
      mapFrom((source) => source.carRental)
    )
  );

  createMap<Booking, BookingDetailsDto>(
    mapper,
    "Booking",
    "BookingDetailsDto",
    forMember(
      (destination) => destination.hotel,
      mapFrom((source) => source.hotel)
    ),
    forMember(
      (destination) => destination.location,
      mapFrom((source) => source.location)
    ),
    forMember(
      (destination) => destination.numberOfGuests,
      mapFrom((source) => source.numberOfGuests)
    ),
    forMember(
      (destination) => destination.numberOfRooms,
      mapFrom((source) => source.numberOfRooms)
    ),
    forMember(
      (destination) => destination.checkIn,
      mapFrom((source) => source.checkIn.toDateString())
    ),
    forMember(
      (destination) => destination.checkOut,
      mapFrom((source) => source.checkOut.toDateString())
    ),
    forMember(
      (destination) => destination.carRental,
      mapFrom((source) => source.carRental)
    ),
    forMember(
      (destination) => destination.guestFamilyName,
      mapFrom((source) => source.guestFamilyName ?? null) // Handle null case
    ),
    forMember(
      (destination) => destination.guestGivenName,
      mapFrom((source) => source.guestGivenName ?? null) // Handle null case
    ),
    forMember(
      (destination) => destination.guestDateOfBirth,
      mapFrom((source) => source.guestDateOfBirth ? source.guestDateOfBirth.toDateString() : null) // Handle null case
    ),
    forMember(
      (destination) => destination.reservationDate,
      mapFrom((source) => source.reservationDate.toDateString())  
    )
  );
};
