import { bookingDtoSchema, bookingIdSchema, bookingVerificationSchema } from "@/server/schemas";
import type { BookingDetailsDto, BookingDto, BookingVerificationParams } from "@/shared/types";
import {
  BookingCreateResponse,
  IssueConfirmationRespone,
} from "@/shared/interfaces";
import { Booking } from "@prisma/client";
import { Inject, Service } from "typedi";
import { ValidateInput } from "../decorators";
import { BookingRepository } from "../repositories";
import { IssuerService } from "./IssuerService";
import { MapperService } from "./MapperService";
import { VerifierService } from "./VerifierService";

@Service()
export class BookingService {
  constructor(
    @Inject() private readonly bookingRepository: BookingRepository,
    @Inject() private mapper: MapperService,
    @Inject() private verifier: VerifierService,
    @Inject() private issuer: IssuerService
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

    await this.bookingRepository.update(newBooking.id, newBooking);

    const response: BookingCreateResponse = {
      url: verificationData.requestUri,
    };
    if (!isMobile) {
      response.bookingId = newBooking.id;
    }
    return response;
  }

  @ValidateInput(bookingVerificationSchema)
public async bookingVerificationStatus({
  bookingID,
  responseCode,  
}: BookingVerificationParams): Promise<boolean> {
  const record = await this.bookingRepository.findById(bookingID);

  // Helper function to handle the common verification logic
  const handleVerification = async (transactionId: string, responseCode?: string) => {
    const verification = await this.verifier.checkVerification(transactionId, responseCode);
    if (
      record && 
      verification.status === true &&
      verification.personalInfo?.date_of_birth &&
      verification.personalInfo.family_name &&
      verification.personalInfo.given_name
    ) {
      record.guestDateOfBirth = new Date(verification.personalInfo.date_of_birth);
      record.guestFamilyName = verification.personalInfo.family_name;
      record.guestGivenName = verification.personalInfo.given_name;

      await this.bookingRepository.update(record.id, record);
      return true;
    }
    return false;
  };

  // Handle crossDeviceTransactionId
  if (record?.crossDeviceTransactionId) {
    return await handleVerification(record.crossDeviceTransactionId);
  }
  
  // Handle sameDeviceTransactionId
  if (record?.sameDeviceTransactionId) {
    return await handleVerification(record.sameDeviceTransactionId, responseCode);
  }

  return false;
}


  @ValidateInput(bookingIdSchema)
  public async bookingIssueConfirmation(
    bookingID: string
  ): Promise<IssueConfirmationRespone | null> {
    const record = await this.bookingRepository.findById(bookingID);
    if (record) {
      const issueConfirmationResponse = await this.issuer.issueConfirmation(
        record
      );
      return issueConfirmationResponse;
    }
    return null;
  }

  @ValidateInput(bookingIdSchema)
  public async bookingDetails(
    bookingID: string
  ): Promise<BookingDetailsDto | null> {
    const record = await this.bookingRepository.findById(bookingID);
    if (record) {
      const bookingPublicDto = this.mapper.map<Booking, BookingDetailsDto>(
        record,
        "Booking",
        "BookingDetailsDto"
      );
      return bookingPublicDto;
    }

    return null;
  }
}
