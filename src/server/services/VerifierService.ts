import { Service } from "typedi";
import axios from "axios";
import { promise } from "zod";

@Service()
export class VerifierService {

  public async initVerification(): Promise<{
    requestUri: string;
    TransactionId: string;
  }> {
    const payload = {
      type: "vp_token",
      presentation_definition: {
        id: "876a562d-3a45-4fde-90b6-7a2b806a156e",
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
//TODO: for same device we have to add  "wallet_response_redirect_uri_template": "https://dev.verifier.eudiw.dev/get-wallet-code?response_code={RESPONSE_CODE}"

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
//TODO 
//   public async confirmVerification():  Promise<{
//     requestUri: string;
//     presentationId: string;
//   }> {
      
//    }
}