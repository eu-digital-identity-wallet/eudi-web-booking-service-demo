import { Service } from "typedi";
import type { IRepository } from "../repositories/interfaces";
import type { IService } from "./interfaces/IService";

@Service()
export class BaseService<T> implements IService<T> {
  constructor(protected readonly repository: IRepository<T>) {}

  async findById(id: number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
