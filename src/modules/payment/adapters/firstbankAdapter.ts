import axios from "axios";
import {
  PaymentProviderAdapter,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentConfirmation
} from "../types";
import { config } from "../../../config/env";

export class FirstBankAdapter implements PaymentProviderAdapter {
  name = "firstbank";

  async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
    // TODO: Replace with real First Bank API call once available
    console.log(`[FIRSTBANK] Initiate payment`, data);
    return {
      provider: this.name,
      reference: data.reference,
      status: "pending"
    };
  }

  async confirmPayment(payload: any): Promise<PaymentConfirmation> {
    return {
      providerReference: payload.ref ?? "firstbank-mock",
      status: "success",
      raw: payload
    };
  }

  verifyWebhookSignature(): boolean {
    return true;
  }
}