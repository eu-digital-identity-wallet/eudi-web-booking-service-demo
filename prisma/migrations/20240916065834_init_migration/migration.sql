-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "crossDeviceTransactionId" TEXT,
    "sameDeviceTransactionId" TEXT,
    "numberOfGuests" INTEGER NOT NULL,
    "numberOfRooms" INTEGER NOT NULL,
    "reservationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "carRental" BOOLEAN NOT NULL,
    "guestFamilyName" TEXT,
    "guestGivenName" TEXT,
    "guestDateOfBirth" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
