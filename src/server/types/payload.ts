export type Payload = {
  type: string;
  presentation_definition: {
    id: string;
    input_descriptors: InputDescriptor[];
  };
  jar_mode: string;
  presentation_definition_mode: string;
  nonce: string;
  wallet_response_redirect_uri_template?: string; // Optional property
};

export type InputDescriptor = {
  id: string;
  name: string;
  purpose: string;
  format: {
    mso_mdoc: { alg: string[] };
  };
  constraints: {
    fields: FieldConstraint[];
  };
}

export type FieldConstraint = {
  path: string[];
  intent_to_retain: boolean;
}