import {
    PaymentProviderAdapter,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentConfirmation
  } from "../types";
  
  export class FlutterwaveAdapter implements PaymentProviderAdapter {
    name = "flutterwave";
  
    async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
      // TODO: Use Flutterwave v3 API /payments endpoint when ready.
      console.log(`[FLUTTERWAVE] Initiate payment`, data);
      return {
        provider: this.name,
        reference: data.reference,
        status: "pending"
      };
    }
  
    async confirmPayment(payload: any): Promise<PaymentConfirmation> {
      return {
        providerReference: payload.ref ?? "flutterwave-mock",
        status: "success",
        raw: payload
      };
    }
  
    verifyWebhookSignature(): boolean {
      return true;
    }
  }