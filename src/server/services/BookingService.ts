import { bookingCreateDtoValidationSchecma } from "@/schemas";
import type { BookingCreateDto, BookingDto } from "@/shared";
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

  async findAll(): Promise<BookingDto[]> {
    const records = await this.bookingRepository.findAll();

    const mappedData = records.map((record) =>
      this.mapper.map<Booking, BookingDto>(record, "Booking", "BookingDto")
    );

    return mappedData;
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
    console.log(newBooking);
    return {"url":verificationData.requestUri,"bookingId":newBooking.id};
  }
  //TODO: implement validate 
  async bookingStatus() : Promise<string> {
    throw new Error("Method not implemented.");
  }
}
