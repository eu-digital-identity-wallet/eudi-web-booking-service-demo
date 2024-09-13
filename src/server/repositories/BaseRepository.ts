import "@/helpers/prisma-client";
import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { Inject, Service } from "typedi";

// Define a generic interface for repository operations
export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

@Service()
export abstract class BaseRepository<T> implements IRepository<T> {
  protected readonly prisma: PrismaClient;

  constructor(@Inject() prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
