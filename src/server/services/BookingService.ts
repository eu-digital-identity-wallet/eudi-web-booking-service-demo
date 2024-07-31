import { AppMapper } from "@/mappings";
import { BookingDto } from "@/shared";
import { Booking } from "@prisma/client";
import { Inject, Service } from "typedi";
import { BookingRepository } from "../repositories";

@Service()
export class BookingService {
  constructor(
    @Inject() private readonly bookingRepository: BookingRepository,
    @Inject() private mapper: AppMapper
  ) {}

  async findAll(): Promise<BookingDto[]> {
    const records = await this.bookingRepository.findAll();

    const mappedData = records.map((record) =>
      this.mapper
        .get()
        .map<Booking, BookingDto>(record, "Booking", "BookingDto")
    );

    return mappedData;
  }
}
