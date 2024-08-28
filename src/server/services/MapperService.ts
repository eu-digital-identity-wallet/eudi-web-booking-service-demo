import { bookingMap } from "@/mappings";
import { Mapper, createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";
import { Service } from "typedi";

export const mapper = createMapper({ strategyInitializer: pojos() });

@Service({ global: true })
export class MapperService {
  private mapper: Mapper = mapper; // Initialize directly

  constructor() {
     this.createMaps();
  }

  map<TSource, TDestination>(source: TSource, sourceKey: string, destinationKey: string): TDestination {
    return this.mapper.map<TSource, TDestination>(source, sourceKey, destinationKey);
  }

  private createMaps() {
    bookingMap(this.mapper);
  }
}
