export type BookingCreateDto = {
  hotel: string;
  location: string;
  crossDeviceTransactionId: string;
  sameDeviceTransactionId: string;
  numberOfGuests: number;
  numberOfRooms: number;
  checkIn: string;
  checkOut: string;
};

export type BookingDto = {
  id:string;
  hotel: string;
  location: string;
  crossDeviceTransactionId: string;
  sameDeviceTransactionId: string;
  numberOfGuests: number;
  numberOfRooms: number;
  checkIn: string;
  checkOut: string;
};

