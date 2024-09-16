import { VerificationResponse } from "@/shared/interfaces";
import { decode } from "cbor-x";
import { Service } from "typedi";

type Payload = {
  type: string;
  presentation_definition: {
    id: string;
    input_descriptors: {
      id: string;
      name: string;
      purpose: string;
      format: {
        mso_mdoc: { alg: string[] };
      };
      constraints: {
        fields: {
          path: string[];
          intent_to_retain: boolean;
        }[];
      };
    }[];
  };
  jar_mode: string;
  presentation_definition_mode: string;
  nonce: string;
  wallet_response_redirect_uri_template?: string; // Optional property
};

// Your decoding logic here
function decodeCborData(data: Uint8Array) {
  try {
    return decode(data);
  } catch (error) {
    console.error("Failed to decode CBOR:", error);
    return null;
  }
}

// Function to extract family name, given name, and date of birth from issuerSigned data
function extractPersonalInfo(decodedData: any): { family_name: string | null; given_name: string | null; date_of_birth: string | null } {
  const issuerSigned = decodedData?.documents?.[0]?.issuerSigned;

  let familyName = null;
  let givenName = null;
  let dateOfBirth = null;

  if (issuerSigned) {
    const namespaces = issuerSigned.nameSpaces;
    if (namespaces && namespaces["eu.europa.ec.eudi.pid.1"]) {
      const elements = namespaces["eu.europa.ec.eudi.pid.1"];

      for (const element of elements) {
        // Decode the CBOR encoded buffer if it exists
        if (element.value) {
          const decodedElement = decode(element.value);

          // Check for family_name, given_name, and date_of_birth in the decoded data
          if (decodedElement && decodedElement.elementIdentifier === "family_name") {
            familyName = decodedElement.elementValue;
          } else if (decodedElement && decodedElement.elementIdentifier === "given_name") {
            givenName = decodedElement.elementValue;
          } else if (decodedElement && decodedElement.elementIdentifier === "birth_date") {
            dateOfBirth = decodedElement.elementValue.value;
          }
        }
      }
    }
  }

  return { family_name: familyName, given_name: givenName, date_of_birth: dateOfBirth };
}

/**
 * Converts a base64url or hex string into a Buffer.
 * @param input - The base64url or hex string to be converted.
 * @returns The corresponding Buffer.
 */
function decodeBase64OrHex(input: string): Buffer {
  const base64Regex = /^[A-Za-z0-9-_]+$/;
  if (base64Regex.test(input)) {
    // Convert base64url to standard base64
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64");
  }
  return Buffer.from(input, "hex");
}

@Service()
export class VerifierService {
  public async initVerification(
    bookingId: string,
    isMobile: boolean
  ): Promise<{
    requestUri: string;
    TransactionId: string;
  }> {
    const payload: Payload = {
      type: "vp_token",
      presentation_definition: {
        id: bookingId,
        input_descriptors: [
          {
            id: "eu.europa.ec.eudi.pid.1",
            name: "EUDI PID",
            purpose: "We need to verify your identity",
            format: {
              mso_mdoc: {
                alg: ["ES256", "ES384", "ES512"],
              },
            },
            constraints: {
              fields: [
                {
                  path: ["$['eu.europa.ec.eudi.pid.1']['family_name']"],
                  intent_to_retain: true,
                },
                {
                  path: ["$['eu.europa.ec.eudi.pid.1']['given_name']"],
                  intent_to_retain: true,
                },
                {
                  path: ["$['eu.europa.ec.eudi.pid.1']['birth_date']"],
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
      payload.wallet_response_redirect_uri_template = `${process.env.NEXT_PUBLIC_APP_URL}/confirmation/${bookingId}?response_code={RESPONSE_CODE}`;
    }

    const response = await fetch(`${process.env.VERIFIER_API_URL}/ui/presentations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),  // Convert payload to JSON
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
  }

  public async checkVerification(
    crossDeviceTransactionId: string
  ): Promise<VerificationResponse> {
    if (!crossDeviceTransactionId) {
      throw new Error("Undefined Transaction.");
    }
  
    try {
      const url = `${process.env.VERIFIER_API_URL}/ui/presentations/${crossDeviceTransactionId}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
  
      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
  
        // Decode the received token
        const buffer = decodeBase64OrHex(responseData.vp_token);
        const decodedData = decodeCborData(buffer);
  
        if (decodedData) {
          // Extract personal info
          const personalInfo = extractPersonalInfo(decodedData);
  
          // Ensure all personal info fields are available
          if (personalInfo.date_of_birth && personalInfo.family_name && personalInfo.given_name) {
            //console.log("Personal Info:", personalInfo);
            return {
              status: true, // response.status === 200
              personalInfo,
            };
          }
        }
      }
  
      // Return a failed verification status if the checks don't pass
      return { status: false };
    } catch (error) {
      console.error("Unexpected error:", error);
  
      // Handle HTTP errors and rethrow for higher-level error handling
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        // This block handles network issues, or invalid URLs
        return { status: false };
      }
  
      throw error; // Re-throw unexpected errors
    }
  }
}
