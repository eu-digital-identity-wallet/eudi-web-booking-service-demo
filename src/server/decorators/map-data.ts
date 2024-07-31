import Container from "typedi";
import { MapperService } from "../services";

export const MapData = (
  sourceIdentifier: string,
  destinationIdentifier: string
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    try {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        const service = Container.get(MapperService);
        const mapperInstance = service.get();
        const returnValue = await originalMethod.apply(this, args);
        if (Array.isArray(returnValue)) {
          const transformedDataArray = returnValue.map((item) =>
            mapperInstance.mapArray(returnValue, item)
          );
          return transformedDataArray;
        }
        const transformedData = mapperInstance.map(
          returnValue,
          sourceIdentifier,
          destinationIdentifier
        );

        return transformedData;
      };
    } catch (err) {
      console.error(err);
    }
  };
};
