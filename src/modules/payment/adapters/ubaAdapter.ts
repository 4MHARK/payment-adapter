import {
    PaymentProviderAdapter,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentConfirmation
  } from "../types";
  
  export class UbaAdapter implements PaymentProviderAdapter {
    name = "uba";
  
    async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
      // TODO: Replace with real UBA API call when credentials and docs are available
      console.log(`[UBA] Initiate payment`, data);
      return {
        provider: this.name,
        reference: data.reference,
        status: "pending"
      };
    }
  
    async confirmPayment(payload: any): Promise<PaymentConfirmation> {
      return {
        providerReference: payload.ref ?? "uba-mock",
        status: "success",
        raw: payload
      };
    }
  
    verifyWebhookSignature(): boolean {
      return true;
    }
  }