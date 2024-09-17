import { KeyObject } from "crypto";
import { JWTPayload, SignJWT } from "jose";
import { Service } from "typedi";

@Service()
export class JWTService {
  public async sign(
    payload: JWTPayload,
    privateKey: KeyObject,
    cert: string
  ): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "ES256", x5c: [cert] })
      .setIssuedAt()
      .setExpirationTime("5m")
      .sign(privateKey);
  }
}
