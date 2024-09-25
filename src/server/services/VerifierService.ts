import { env } from "@/env.mjs";
import { VerificationResponse } from "@/shared/interfaces";
import { Inject, Service } from "typedi";
import { Payload } from "../types"; // Assuming Payload is defined in a types file
import { DataDecoderService } from "./DataDecoderService"; // Inject the new DataDecoderService

@Service()
export class VerifierService {
  constructor(
    @Inject() private readonly dataDecoderService: DataDecoderService // Injecting the DataDecoderService
  ) {}

  public async initVerification(
    bookingId: string,
    isMobile: boolean
  ): Promise<{ requestUri: string; TransactionId: string }> {
    const payload: Payload = this.buildPayload(bookingId, isMobile);

    try {
      const response = await fetch(`${env.VERIFIER_API_URL}/ui/presentations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const clientId = encodeURIComponent(data.client_id);
      const requestURI = encodeURIComponent(data.request_uri);
      const TransactionId = encodeURIComponent(data.presentation_id);
      const requestUri = `eudi-openid4vp://?client_id=${clientId}&request_uri=${requestURI}`;

      return { requestUri, TransactionId };
    } catch (error) {
      console.error("Error in initVerification:", error);
      throw new Error("Failed to initialize verification process.");
    }
  }

  private buildPayload(bookingId: string, isMobile: boolean): Payload {
    const payload: Payload = {
      type: "vp_token",
      presentation_definition: {
        id: bookingId,
        input_descriptors: [
          {
            id: "org.iso.18013.5.1.mDL",
            name: "Mobile Driving Licence",
            purpose: "We need to verify your mobile driving licence",
            format: {
              mso_mdoc: { alg: ["ES256", "ES384", "ES512"] },
            },
            constraints: {
              fields: [
                {
                  path: ["$['org.iso.18013.5.1']['family_name']"],
                  intent_to_retain: true,
                },
                {
                  path: ["$['org.iso.18013.5.1']['given_name']"],
                  intent_to_retain: true,
                },
                {
                  path: ["$['org.iso.18013.5.1']['birth_date']"],
                  intent_to_retain: true,
                },
              ],
            },
          },
        ],
      },
      jar_mode: "by_reference",
      presentation_definition_mode: "by_reference",
      nonce: "eaaace85-4d77-45dc-b57a-9043a548ab86",
    };

    if (isMobile) {
      payload.wallet_response_redirect_uri_template = `${env.NEXT_PUBLIC_APP_URI}/confirmation/${bookingId}?response_code={RESPONSE_CODE}`;
    }

    return payload;
  }

  public async checkVerification(
    crossDeviceTransactionId: string,
    responseCode?:string
  ): Promise<VerificationResponse> {
    if (!crossDeviceTransactionId) {
      throw new Error("Transaction ID is undefined.");
    }

    try {
      let url = `${env.VERIFIER_API_URL}/ui/presentations/${crossDeviceTransactionId}`;
      if(responseCode){
        url += `?response_code=${responseCode}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        return { status: false };
      }

      const responseData = await response.json();

      // Use the DataDecoderService to decode the token
      const buffer = this.dataDecoderService.decodeBase64OrHex(
        responseData.vp_token[0]
      );
      const decodedData = this.dataDecoderService.decodeCborData(buffer);

      if (decodedData) {
        const personalInfo = this.extractPersonalInfo(decodedData);

        if (
          personalInfo.family_name &&
          personalInfo.given_name &&
          personalInfo.date_of_birth
        ) {
          return { status: true, personalInfo };
        }
      }

      return { status: false };
    } catch (error) {
      console.error("Error in checkVerification:", error);
      throw error;
    }
  }

  // The function to extract personal info can remain in this service or moved to the decoder service if it's reusable
  private extractPersonalInfo(decodedData: any): {
    family_name: string | null;
    given_name: string | null;
    date_of_birth: string | null;
  } {

    let info = { family_name: "", given_name: "", date_of_birth: "" };
    for (const doc of decodedData?.documents) {
      let tmpPersonInfo = this.extractInfoFromAttestation(doc)
      if (tmpPersonInfo.family_name) {
        info.family_name = tmpPersonInfo.family_name;
      }
      if (tmpPersonInfo.date_of_birth) {
        info.date_of_birth = tmpPersonInfo.date_of_birth;
      }
      if (tmpPersonInfo.given_name) {
        info.given_name = tmpPersonInfo.given_name;
      }
    }
    return info;
  }

  private extractInfoFromAttestation(document: any): {
    family_name: string | null;
    given_name: string | null;
    date_of_birth: string | null;
  } {
    let namespaces = document.issuerSigned.nameSpaces;

    let familyName: string | null = null;
    let givenName: string | null = null;
    let dateOfBirth: string | null = null;

    Object.keys(namespaces).forEach((it: string) => {
      let namespace = namespaces[it]
      for (const element of namespace) {
        const decodedElement = this.dataDecoderService.decodeCborData(element.value);
        if (decodedElement) {
          switch (decodedElement.elementIdentifier) {
            case "family_name":
              familyName = decodedElement.elementValue;
              break;
            case "given_name":
              givenName = decodedElement.elementValue;
              break;
            case "birth_date":
              dateOfBirth = decodedElement.elementValue.value;
              break;
          }
        }
      }

    })
    return {
      family_name: familyName,
      given_name: givenName,
      date_of_birth: dateOfBirth,
    };
  }
}
