import axios from "axios";
import {
  PaymentProviderAdapter,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentConfirmation
} from "../types";
import { config } from "../../../config/env";

export class AccessBankAdapter implements PaymentProviderAdapter {
  name = "accessbank";

  async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
    // TODO: Replace with real Access Bank API call
    console.log(`[ACCESS BANK] Initiate payment`, data);
    return {
      provider: this.name,
      reference: data.reference,
      status: "pending"
    };
  }

  async confirmPayment(payload: any): Promise<PaymentConfirmation> {
    return {
      providerReference: payload.ref ?? "access-mock",
      status: "success",
      raw: payload
    };
  }

  verifyWebhookSignature(): boolean {
    return true;
  }
}