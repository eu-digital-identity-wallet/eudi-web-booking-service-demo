import { bookingCreateDtoValidationSchecma, bookingIdSchema } from "@/schemas";
import type { BookingCreateDto, BookingDto, BookingPublicDto } from "@/shared";
import { Booking } from "@prisma/client";
import { Inject, Service } from "typedi";
import { ValidateInput } from "../decorators";
import { BookingRepository } from "../repositories";
import { MapperService } from "./MapperService";
import { VerifierService } from "./VerifierService";

type CreateResponse = {
  url: string;
  bookingId?:string;
}

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
      const bookingDto = this.mapper.map<Booking, BookingDto>(record, "Booking", "BookingDto");

      return bookingDto;
    }

    throw new Error("Booking not found.");
  }

  @ValidateInput(bookingCreateDtoValidationSchecma)
  public async create(bookingCreateDto: BookingCreateDto, isMobile:boolean ): Promise<{}> {
     
    const mappedData = this.mapper.map<BookingCreateDto, Booking>(bookingCreateDto, "BookingCreateDto", "Booking"); 
    const newBooking = await this.bookingRepository.create(mappedData);
    
    const verificationData = await this.verifier.initVerification(newBooking.id,isMobile);
   
   
    if(isMobile){
      newBooking.sameDeviceTransactionId = verificationData.TransactionId;
    }else{
      newBooking.crossDeviceTransactionId = verificationData.TransactionId;
    }
    
    const updateBooking = await this.bookingRepository.update(newBooking.id,newBooking);

      
    const response:CreateResponse = {"url":verificationData.requestUri}
    if(!isMobile){
      response.bookingId = newBooking.id
    }
    return response;
  }

  @ValidateInput(bookingIdSchema)
  public async bookingVerificationStatus(bookingID:string) : Promise<boolean> {
    const booking = await this.findById(bookingID);
    const verificationStatus = await this.verifier.checkVerification(booking.crossDeviceTransactionId);
    //TODO add to database vp_token & family name if confirmed
    return verificationStatus;
  }

  @ValidateInput(bookingIdSchema)
  public async bookingDetails(bookingID:string) : Promise<BookingPublicDto> {
    const booking = await this.findById(bookingID);
    const bookingPublicDto = this.mapper.map<BookingDto, BookingPublicDto>(booking, "BookingDto", "BookingPublicDto"); 

    return bookingPublicDto;
  }
}
