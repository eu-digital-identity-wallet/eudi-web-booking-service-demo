import { Booking } from "@prisma/client";
import { Service } from "typedi";
import { BaseRepository } from "./BaseRepository";

@Service()
export class BookingRepository extends BaseRepository<Booking> {
  async findAll(): Promise<Booking[]> {
    return await this.prisma.booking.findMany();
  }

  findById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  async create(entity: Booking): Promise<Booking> {
    return await this.prisma.booking.create({ data: entity });
  }

  async update(id: string, entity: Booking): Promise<Booking> {
    return await this.prisma.booking.update({ where: { id }, data: entity });
  }

  async delete(id: string): Promise<Booking> {
    return await this.prisma.booking.delete({ where: { id } });
  }
}
