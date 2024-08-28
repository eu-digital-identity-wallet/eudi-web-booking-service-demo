import { bookingCreateDtoValidationSchecma, bookingIdSchema } from "@/schemas";
import type { BookingCreateDto, BookingDto, BookingPublicDto } from "@/shared";
import { Booking } from "@prisma/client";
import { Inject, Service } from "typedi";
import { ValidateInput } from "../decorators";
import { BookingRepository } from "../repositories";
import { MapperService } from "./MapperService";
import { VerifierService } from "./VerifierService";

@Service()
export class BookingService {

  constructor(
    @Inject() private readonly bookingRepository: BookingRepository,
    @Inject() private mapper: MapperService,
    @Inject() private verifier: VerifierService
  ) {}

  private async findById(bookingID:string): Promise<BookingDto> {
    if(!bookingID){
      throw new Error("Booking Id is needed.");
    }
    const record = await this.bookingRepository.findById(bookingID);
    if(record){
      const mappedData = this.mapper.map<Booking, BookingDto>(record, "Booking", "BookingDto");

      return mappedData;
    }

    throw new Error("Booking not found.");
  }

  @ValidateInput(bookingCreateDtoValidationSchecma)
  async create(bookingCreateDto: BookingCreateDto): Promise<{}> {
    console.log(bookingCreateDto);
    const verificationData = await this.verifier.initVerification();
    console.log(verificationData);
    //TODO if desktop 
    bookingCreateDto.crossDeviceTransactionId = verificationData.TransactionId;
    //TODO if mobile 
    //request.sameDeviceTransactionId = verificationData.TransactionId;
    const mappedData = this.mapper.map<BookingCreateDto, Booking>(bookingCreateDto, "bookingCreateDto", "Booking"); 
      
    const newBooking = await this.bookingRepository.create(mappedData);
     
    return {"url":verificationData.requestUri,"bookingId":newBooking.id};
  }

  @ValidateInput(bookingIdSchema)
  async bookingVerificationStatus(bookingID:string) : Promise<boolean> {
    const booking = await this.findById(bookingID);
    const verificationStatus = await this.verifier.checkVerification(booking.crossDeviceTransactionId);
     
    return verificationStatus;
    //throw new Error("Method not implemented.");
  }

  @ValidateInput(bookingIdSchema)
  async bookingDetails(bookingID:string) : Promise<BookingPublicDto> {
    const booking = await this.findById(bookingID);
    const mappedData = this.mapper.map<BookingDto, BookingPublicDto>(booking, "BookingDto", "BookingPublicDto"); 

    return mappedData;
    //throw new Error("Method not implemented.");
  }
}
