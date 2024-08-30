import { bookingDtoSchema, bookingIdSchema } from "@/server/schemas";
import type { BookingDto } from "@/shared";
import { BookingCreateResponse } from "@/shared/interfaces";
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

  @ValidateInput(bookingDtoSchema)
  public async create(
    bookingCreateDto: BookingDto,
    isMobile: boolean
  ): Promise<BookingCreateResponse> {
    const mappedData = this.mapper.map<BookingDto, Booking>(
      bookingCreateDto,
      "BookingDto",
      "Booking"
    );
    const newBooking = await this.bookingRepository.create(mappedData);

    const verificationData = await this.verifier.initVerification(
      newBooking.id,
      isMobile
    );

    if (isMobile) {
      newBooking.sameDeviceTransactionId = verificationData.TransactionId;
    } else {
      newBooking.crossDeviceTransactionId = verificationData.TransactionId;
    }

    const updateBooking = await this.bookingRepository.update(
      newBooking.id,
      newBooking
    );

    const response: BookingCreateResponse = {
      url: verificationData.requestUri,
    };
    if (!isMobile) {
      response.bookingId = newBooking.id;
    }
    return response;
  }

  @ValidateInput(bookingIdSchema)
  public async bookingVerificationStatus(bookingID: string): Promise<boolean> {
    const record = await this.bookingRepository.findById(bookingID);
    if (record?.crossDeviceTransactionId) {
      const verificationStatus = await this.verifier.checkVerification(
        record.crossDeviceTransactionId
      );
      //TODO add to database vp_token & family name if confirmed
      return verificationStatus;
    }
    return false;
  }

  @ValidateInput(bookingIdSchema)
  public async bookingDetails(bookingID: string): Promise<BookingDto | null> {
    const record = await this.bookingRepository.findById(bookingID);
    if (record) {
      const bookingPublicDto = this.mapper.map<Booking, BookingDto>(
        record,
        "Booking",
        "BookingDto"
      );
      return bookingPublicDto;
    }

    return null;
  }
}
