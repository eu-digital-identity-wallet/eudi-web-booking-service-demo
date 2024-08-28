import { Service } from "typedi";
import axios from "axios";
import { object, promise } from "zod";

@Service()
export class VerifierService {
  
  public async initVerification(isMobile:boolean): Promise<{
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
    

   if(isMobile){
    // payload.wallet_response_redirect_uri_template= new object(); 
    // payload.wallet_response_redirect_uri_template =  "https://localhost:3000/booking/verification/cm0dw02qc000h127gy8lvfd8q?response_code={RESPONSE_CODE}"
   }

    console.error(isMobile);
//TODO: for same device we have to add  

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
 

  public async checkVerification(crossDeviceTransactionId: string) :Promise< boolean> {
    if(!crossDeviceTransactionId){
      throw new Error("Transaction not permitted.");
    }
    console.log("crossDeviceTransactionId", crossDeviceTransactionId);
    try {
      const url = `https://dev.verifier-backend.eudiw.dev/ui/presentations/${crossDeviceTransactionId}`;
      
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
        },
      });
      // {
      //   vp_token: 'o2d2ZXJzaW9uYzEuMGlkb2N1bWVudHOBo2dkb2NUeXBld2V1LmV1cm9wYS5lYy5ldWRpLnBpZC4xbGlzc3VlclNpZ25lZKJqbmFtZVNwYWNlc6F3ZXUuZXVyb3BhLmVjLmV1ZGkucGlkLjGB2BhYaKRmcmFuZG9tWCDIAtF_RDum3bl3KZMY7w4VSriElk83aPAPpsrO6YacwmhkaWdlc3RJRAFsZWxlbWVudFZhbHVlaE5pa29sYW9zcWVsZW1lbnRJZGVudGlmaWVya2ZhbWlseV9uYW1lamlzc3VlckF1dGiEQ6EBJqEYIVkC6DCCAuQwggJqoAMCAQICFHIybfZjCJp7UA-MPyamhcvCwtLKMAoGCCqGSM49BAMCMFwxHjAcBgNVBAMMFVBJRCBJc3N1ZXIgQ0EgLSBVVCAwMTEtMCsGA1UECgwkRVVESSBXYWxsZXQgUmVmZXJlbmNlIEltcGxlbWVudGF0aW9uMQswCQYDVQQGEwJVVDAeFw0yMzA5MDIxNzQyNTFaFw0yNDExMjUxNzQyNTBaMFQxFjAUBgNVBAMMDVBJRCBEUyAtIDAwMDExLTArBgNVBAoMJEVVREkgV2FsbGV0IFJlZmVyZW5jZSBJbXBsZW1lbnRhdGlvbjELMAkGA1UEBhMCVVQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARJBHzUHC0bpmqOtZBhZbDmk94bHOWvem1civd-0j3esn8q8L1MCColNqQkCPadXjJAYsmXS3D4-HB9scOshixYo4IBEDCCAQwwHwYDVR0jBBgwFoAUs2y4kRcc16QaZjGHQuGLwEDMlRswFgYDVR0lAQH_BAwwCgYIK4ECAgAAAQIwQwYDVR0fBDwwOjA4oDagNIYyaHR0cHM6Ly9wcmVwcm9kLnBraS5ldWRpdy5kZXYvY3JsL3BpZF9DQV9VVF8wMS5jcmwwHQYDVR0OBBYEFIHv9JxcgwpQpka-91B4WlM-P9ibMA4GA1UdDwEB_wQEAwIHgDBdBgNVHRIEVjBUhlJodHRwczovL2dpdGh1Yi5jb20vZXUtZGlnaXRhbC1pZGVudGl0eS13YWxsZXQvYXJjaGl0ZWN0dXJlLWFuZC1yZWZlcmVuY2UtZnJhbWV3b3JrMAoGCCqGSM49BAMCA2gAMGUCMEX62qLvLZVT67SIRNhkGtAqnjqOSit32uL0HnlfLy2QmwPygQmUa04tkoOtf8GhhQIxAJueTu1QEJ9fDrcALM-Ys_7kEUB-Ze4w-wEEvtZzguqD3h9cxIjmEBdkATInQ0BNClkCNtgYWQIxpmdkb2NUeXBld2V1LmV1cm9wYS5lYy5ldWRpLnBpZC4xZ3ZlcnNpb25jMS4wbHZhbGlkaXR5SW5mb6Nmc2lnbmVkwHQyMDI0LTA4LTI4VDA5OjA2OjU3Wml2YWxpZEZyb23AdDIwMjQtMDgtMjhUMDk6MDY6NTdaanZhbGlkVW50aWzAdDIwMjQtMTEtMjZUMDA6MDA6MDBabHZhbHVlRGlnZXN0c6F3ZXUuZXVyb3BhLmVjLmV1ZGkucGlkLjGnAFggnYOft0I1-ZOXN4gTFMK4VBTLyIsuNYzUnXep5dge2IEBWCDz8qaOSXzzMGvphRaiYAz_-NUoNyiGbwUMCk7dghbM5wJYIIz8WEmy7imIg2IocTB6vEau-3w0CmqgjOh-ZF6COn8GA1ggdpWdnb_yXBXDxdgg92HA06e5ltHWp1KGySoeb0tx7KwEWCCpUvxcQ9krnvdKTY9ubHsqnEAw_TnbkXBWlzCnQRuXNwVYIN46FtRyEWjZV_nuLZJl2LLHI8L6U6Kb7Swg9dXVBtsaBlggQ36GoHHufiZRKeLSGhnmEsqD7gcXLjk_4ir08C88tlltZGV2aWNlS2V5SW5mb6FpZGV2aWNlS2V5pAECIAEhWCBRga_RzJ_Oo0p5-l87RfmnSvk2qeSIUALW-LYe30BGRyJYIDaxGhCGnOMf4UWflbmO7G0wfk-xS3ZfNnobsopnxlfCb2RpZ2VzdEFsZ29yaXRobWdTSEEtMjU2WECp-9R66h3BhzavUi1u9WHdqI6W8lzuv-iAymDi3gnM5sjHb-lc7rqowvuf1t8NYsRHCBJQoc3W8r5tAw7nDuGibGRldmljZVNpZ25lZKJqbmFtZVNwYWNlc9gYQaBqZGV2aWNlQXV0aKFvZGV2aWNlU2lnbmF0dXJlhEOhASag9lhAdiKDYtUO_n6YCp1S7JNq8GjCU5GyB-oaCyxJFlZ49B4rXF9zjt2IWrQ-RwUKL4jEJZ1FJJO8RzygR5RvcY7zQmZzdGF0dXMA',
      //   presentation_submission: {
      //     id: '8B50041B-1F00-49F3-A8B6-F258E5BF0902',
      //     definition_id: '876a562d-3a45-4fde-90b6-7a2b806a156e',
      //     descriptor_map: [ [Object] ]
      //   }
      console.log(response.data);
      return response.status===200; //if response.status equals to 200 means that is verified by user
    } catch (error) {
      console.error('Error fetching presentation:', error);
      throw error;
    } 
  }

}