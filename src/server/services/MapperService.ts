import { bookingMap } from "@/mappings";
import { Mapper, createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";
import { Service } from "typedi";

export const mapper = createMapper({ strategyInitializer: pojos() });

@Service({ global: true })
export class MapperService {
  private mapper: Mapper;

  constructor() {
    this.mapper = mapper;
    this.createMaps();
  }

  get() {
    return this.mapper;
  }

  private createMaps() {
    bookingMap(this.mapper);
  }
}
