import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";

import { BookingDto } from "@/shared";
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
    )
  );

  createMap<Booking, BookingDto>(
    mapper,
    "Booking",
    "BookingDto",
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
    )
  );
};
