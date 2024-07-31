import { Mapper, createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";
import { Service } from "typedi";
import { bookingMap } from "./booking";

export const mapper = createMapper({ strategyInitializer: pojos() });

@Service()
export class AppMapper {
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
