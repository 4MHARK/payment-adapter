import {
    PaymentInitRequest,
    PaymentInitResponse,
    RefundRequest,
    SubscriptionCreateRequest
  } from "./types";
  import { getProvider } from "./providerRegistry";
  
  export class PaymentService {
    async initPayment(
      providerName: string,
      data: PaymentInitRequest
    ): Promise<PaymentInitResponse> {
      const provider = getProvider(providerName);
      return provider.initPayment(data);
    }
  
    async confirmPayment(providerName: string, payload: any) {
      const provider = getProvider(providerName);
      return provider.confirmPayment(payload);
    }
  
    async refundPayment(providerName: string, data: RefundRequest) {
      const provider = getProvider(providerName);
      if (!provider.refundPayment)
        throw new Error(`${providerName} does not support refunds`);
      return provider.refundPayment(data);
    }
  
    async createSubscription(providerName: string, data: SubscriptionCreateRequest) {
      const provider = getProvider(providerName);
      if (!provider.createSubscription)
        throw new Error(`${providerName} does not support subscriptions`);
      return provider.createSubscription(data);
    }
  
    async cancelSubscription(providerName: string, id: string) {
      const provider = getProvider(providerName);
      if (!provider.cancelSubscription)
        throw new Error(`${providerName} does not support subscription cancel`);
      return provider.cancelSubscription(id);
    }
  }