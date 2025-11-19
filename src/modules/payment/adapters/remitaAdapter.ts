import {
    PaymentProviderAdapter,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentConfirmation
  } from "../types";
  
  export class RemitaAdapter implements PaymentProviderAdapter {
    name = "remita";
  
    async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
      // TODO: Implement Remita API integration (RRR generation, payment verification).
      console.log(`[REMITA] Initiate payment`, data);
      return {
        provider: this.name,
        reference: data.reference,
        status: "pending"
      };
    }
  
    async confirmPayment(payload: any): Promise<PaymentConfirmation> {
      return {
        providerReference: payload.ref ?? "remita-mock",
        status: "success",
        raw: payload
      };
    }
  
    verifyWebhookSignature(): boolean {
      return true;
    }
  }