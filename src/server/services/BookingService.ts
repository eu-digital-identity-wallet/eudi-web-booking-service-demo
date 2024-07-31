import { bookingSchema } from "@/schemas";
import type { BookingDto } from "@/shared";
import { Booking } from "@prisma/client";
import axios from "axios";
import { Inject, Service } from "typedi";
import { ValidateInput } from "../decorators";
import { BookingRepository } from "../repositories";
import { MapperService } from "./MapperService";

@Service()
export class BookingService {
  constructor(
    @Inject() private readonly bookingRepository: BookingRepository,
    @Inject() private mapper: MapperService
  ) {}

  async findAll(): Promise<BookingDto[]> {
    const records = await this.bookingRepository.findAll();

    const mappedData = records.map((record) =>
      this.mapper
        .get()
        .map<Booking, BookingDto>(record, "Booking", "BookingDto")
    );

    return mappedData;
  }

  @ValidateInput(bookingSchema)
  async create(request: BookingDto): Promise<string> {
    const verificationData = await this.initVerification();

    request.crossDeviceTransactionId = verificationData.presentationId;
    const data = this.mapper
      .get()
      .map<BookingDto, Booking>(request, "BookingDto", "Booking");
    await this.bookingRepository.create(data);

    return verificationData.requestUri;
  }

  private async initVerification(): Promise<{
    requestUri: string;
    presentationId: string;
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

    const response = await axios.post(
      "https://dev.verifier-backend.eudiw.dev/ui/presentations",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    const clientId = encodeURIComponent(response.data.client_id);
    const requestURI = encodeURIComponent(response.data.request_uri);
    const presentationId = encodeURIComponent(response.data.presentation_id);

    const requestUri = `eudi-openid4vp://?client_id=${clientId}&request_uri=${requestURI}`;

    return { requestUri, presentationId };
  }
}
