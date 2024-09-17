export type Payload = {
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
