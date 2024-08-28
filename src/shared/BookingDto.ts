//this is what user can submit
export type BookingCreateDto = {
  hotel: string;
  location: string;
  numberOfGuests: number;
  numberOfRooms: number;
  checkIn: string;
  checkOut: string;
};
//this is what we work with after we receive data from db
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
//this is what we send to the user 
export type BookingPublicDto = {
  hotel: string;
  location: string;
  numberOfGuests: number;
  numberOfRooms: number;
  checkIn: string;
  checkOut: string;
};

