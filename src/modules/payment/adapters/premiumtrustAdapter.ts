import {
    PaymentProviderAdapter,
    PaymentInitRequest,
    PaymentInitResponse,
    PaymentConfirmation
  } from "../types";
  
  export class PremiumtrustAdapter implements PaymentProviderAdapter {
    name = "premiumtrust";
  
    async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
      // TODO: Connect to official Premium Trust Bank API when endpoints are provided.
      console.log(`[PREMIUMTRUST] Initiate payment`, data);
      return {
        provider: this.name,
        reference: data.reference,
        status: "pending"
      };
    }
  
    async confirmPayment(payload: any): Promise<PaymentConfirmation> {
      return {
        providerReference: payload.ref ?? "premiumtrust-mock",
        status: "success",
        raw: payload
      };
    }
  
    verifyWebhookSignature(): boolean {
      return true;
    }
  }