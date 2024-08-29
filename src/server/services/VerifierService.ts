import { Service } from "typedi";
import axios from "axios";
import { decode } from 'cbor-x';


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
      console.error('Failed to decode CBOR:', error);
      return null;
  }
}

// Function to extract the family name from issuerSigned data
function extractFamilyName(decodedData: any): string | null {
  const issuerSigned = decodedData?.documents?.[0]?.issuerSigned;
  
  if (issuerSigned) {
      const namespaces = issuerSigned.nameSpaces;
      if (namespaces && namespaces["eu.europa.ec.eudi.pid.1"]) {
          const elements = namespaces["eu.europa.ec.eudi.pid.1"];
          
          for (const element of elements) {
              // Decode the CBOR encoded buffer if it exists
              if (element.value) {
                  const decodedElement = decode(element.value);
 
                  // Now, check for the family_name in the decoded data
                  if (decodedElement && decodedElement.elementIdentifier==='family_name') {
                      return decodedElement.elementValue;
                  }
              }
          }
      }
  }
  return null;
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
      const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
      return Buffer.from(base64, 'base64');
  }
  return Buffer.from(input, 'hex');
}

@Service()
export class VerifierService {
  
  public async initVerification(bookingId:string,isMobile:boolean): Promise<{
    requestUri: string;
    TransactionId: string;
  }> {
    const payload:Payload = {
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
                  intent_to_retain: false,
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
    
    if(isMobile){
      payload.wallet_response_redirect_uri_template =  `https://localhost:3000/booking/verification/${bookingId}?response_code={RESPONSE_CODE}`;
    }

    const response = await axios.post(
        "https://dev.verifier-backend.eudiw.dev/ui/presentations",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
    const clientId = encodeURIComponent(response.data.client_id);
    const requestURI = encodeURIComponent(response.data.request_uri);
    const TransactionId = encodeURIComponent(response.data.presentation_id);
    const requestUri = `eudi-openid4vp://?client_id=${clientId}&request_uri=${requestURI}`;

    return { requestUri, TransactionId };
  }
  
  public async checkVerification(crossDeviceTransactionId: string): Promise<boolean> {
    if (!crossDeviceTransactionId) {
      throw new Error("Undefined Transaction.");
    }
     
    try {
      const url = `https://dev.verifier-backend.eudiw.dev/ui/presentations/${crossDeviceTransactionId}`;
      
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
        },
      });

      // Decode the received token
      const buffer = decodeBase64OrHex(response.data.vp_token);
      const decodedData = decodeCborData(buffer);

      if (decodedData) {
         
        // Extract the family name from issuerSigned
        const familyName = extractFamilyName(decodedData);
        if (familyName) {
          console.log('Family Name:', familyName);
        } else {
          console.log('Family Name: Family name not found');
        }
      } else {
        console.log('Family Name: Family name not found');
      }

      return response.status === 200;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return false;
        } else {
          console.error('An error occurred:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}