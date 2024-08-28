import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";

import { BookingCreateDto, BookingDto, BookingPublicDto } from "@/shared";
import { Booking } from "@prisma/client";

export const bookingMap = (mapper: Mapper) => {
  createMap<BookingCreateDto, Booking>(
    mapper,
    "bookingCreateDto",
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
      (destination) => destination.id,
      mapFrom((source) => source.id)
    ),
    forMember(
      (destination) => destination.hotel,
      mapFrom((source) => source.hotel)
    ),
    forMember(
      (destination) => destination.location,
      mapFrom((source) => source.location)
    ),
    forMember(
      (destination) => destination.crossDeviceTransactionId,
      mapFrom((source) => source.crossDeviceTransactionId)
    ),
    forMember(
      (destination) => destination.sameDeviceTransactionId,
      mapFrom((source) => source.sameDeviceTransactionId)
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

  createMap<BookingDto, BookingPublicDto>(
    mapper,
    "BookingDto",
    "BookingPublicDto",
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
      mapFrom((source) => source.checkIn)
    ),
    forMember(
      (destination) => destination.checkOut,
      mapFrom((source) => source.checkOut)
    )
  );
};
