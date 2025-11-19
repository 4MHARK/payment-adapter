export interface PaymentInitRequest {
    amount: number;
    currency: string;
    customerId: string;
    reference: string;
    description?: string;
    callbackUrl?: string;
    metadata?: Record<string, any>;
  }
  
  export interface PaymentInitResponse {
    provider: string;
    reference: string;
    paymentUrl?: string;
    status: "pending" | "redirect" | "completed" | "failed";
  }
  
  export interface PaymentConfirmation {
    providerReference: string;
    status: "success" | "failed";
    raw: any;
    metadata?: Record<string, any>;
  }
  
  export interface SubscriptionCreateRequest {
    customerId: string;
    planId: string;
    amount: number;
    currency: string;
    interval: "monthly" | "yearly" | "weekly";
  }
  
  export interface RefundRequest {
    paymentId: string;
    amount?: number;
    reason?: string;
  }
  
  export interface RefundResponse {
    refundId: string;
    status: "pending" | "success" | "failed";
  }
  
  export interface PaymentProviderAdapter {
    name: string;
  
    initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse>;
    confirmPayment(payload: any): Promise<PaymentConfirmation>;
    refundPayment?(data: RefundRequest): Promise<RefundResponse>;
    createSubscription?(data: SubscriptionCreateRequest): Promise<any>;
    cancelSubscription?(subscriptionId: string): Promise<any>;
    verifyWebhookSignature?(rawBody: any, headers: any): boolean;
  }