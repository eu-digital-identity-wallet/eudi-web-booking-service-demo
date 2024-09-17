import { KeyObject, createPrivateKey, createPublicKey } from "crypto";
import fs from "fs";
import jks from "jks-js";
import { Service } from "typedi";

@Service()
export class KeystoreService {
  public loadKeystore(): {
    privateKey: KeyObject;
    publicKey: KeyObject;
    cert: string;
  } {
    const keystoreFile = this.getRequiredEnvVar("KEYSTORE_FILE");
    const keystorePass = this.getRequiredEnvVar("KEYSTORE_PASS");
    const keystoreAlias = this.getRequiredEnvVar("KEYSTORE_ALIAS");

    const keystore = jks.toPem(fs.readFileSync(keystoreFile), keystorePass);
    const jksStore = keystore[keystoreAlias];

    if (!jksStore.key || !jksStore.cert) {
      throw new Error("Keystore missing key or certificate");
    }

    return {
      privateKey: createPrivateKey(jksStore.key),
      publicKey: createPublicKey(jksStore.cert),
      cert: jksStore.cert
        .replace(/-----BEGIN CERTIFICATE-----/g, "")
        .replace(/-----END CERTIFICATE-----/g, "")
        .replace(/\n/g, ""),
    };
  }

  private getRequiredEnvVar(variable: string): string {
    const value = process.env[variable];
    if (!value)
      throw new Error(`Missing required environment variable: ${variable}`);
    return value;
  }
}
