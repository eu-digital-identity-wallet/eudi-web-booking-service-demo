import { decode } from "cbor-x";
import { Service } from "typedi";

@Service()
export class DataDecoderService {
  public decodeBase64OrHex(input: string): Buffer {
    const base64Regex = /^[A-Za-z0-9-_]+$/;
    if (base64Regex.test(input)) {
      const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
      return Buffer.from(base64, "base64");
    }
    return Buffer.from(input, "hex");
  }

  public decodeCborData(data: Uint8Array): any {
    try {
      return decode(data);
    } catch (error) {
      console.error("Failed to decode CBOR:", error);
      return null;
    }
  }
}
