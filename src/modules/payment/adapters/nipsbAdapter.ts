import {
    PaymentProviderAdapter,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentConfirmation
  } from "../types";
  
  export class NipsbAdapter implements PaymentProviderAdapter {
    name = "nipsb";
  
    async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
      // TODO: Connect to NIPSB switch API after acquiring production credentials.
      console.log(`[NIPSB] Initiate payment`, data);
      return {
        provider: this.name,
        reference: data.reference,
        status: "pending"
      };
    }
  
    async confirmPayment(payload: any): Promise<PaymentConfirmation> {
      return {
        providerReference: payload.ref ?? "nipsb-mock",
        status: "success",
        raw: payload
      };
    }
  
    verifyWebhookSignature(): boolean {
      return true;
    }
  }