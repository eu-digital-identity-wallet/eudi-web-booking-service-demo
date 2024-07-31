import { Booking, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { BaseRepository } from "./BaseRepository";

@Service()
export class BookingRepository extends BaseRepository<Booking> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient.booking); // Assuming `user` is a model in your Prisma schema
  }
}
