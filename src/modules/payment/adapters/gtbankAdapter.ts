import axios from "axios";
import {
  PaymentProviderAdapter,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentConfirmation
} from "../types";
import { config } from "../../../config/env";

export class GtbankAdapter implements PaymentProviderAdapter {
  name = "gtbank";

  async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
    // TODO: Replace with real GTBank API call once integration details are available.
    console.log(`[GTBANK] Initiate payment`, data);
    return {
      provider: this.name,
      reference: data.reference,
      status: "pending"
    };
  }

  async confirmPayment(payload: any): Promise<PaymentConfirmation> {
    return {
      providerReference: payload.ref ?? "gtbank-mock",
      status: "success",
      raw: payload
    };
  }

  verifyWebhookSignature(): boolean {
    return true;
  }
}