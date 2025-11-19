import axios from "axios";
import {
  PaymentProviderAdapter,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentConfirmation,
  RefundRequest,
  RefundResponse
} from "../types";
import { config } from "../../../config/env";

export class PaystackAdapter implements PaymentProviderAdapter {
  name = "paystack";
  private baseUrl = "https://api.paystack.co";

  private get headers() {
    return {
      Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json"
    };
  }
  constructor() {
    console.log("Paystack Secret Key Loaded:", config.PAYSTACK_SECRET_KEY ? "✅ yes" : "❌ no");
  }

  async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
    const res = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      {
        amount: data.amount * 100,
        email: "customer@example.com", // Replace with stored customer email
        currency: data.currency.toUpperCase(),
        callback_url: data.callbackUrl,
        metadata: data.metadata
      },
      { headers: this.headers }
    );

    const result = res.data.data;
    return {
      provider: this.name,
      reference: result.reference,
      paymentUrl: result.authorization_url,
      status: "redirect"
    };
  }

  async confirmPayment(payload: any): Promise<PaymentConfirmation> {
    const event = payload?.event;
    const data = payload?.data;

    return {
      providerReference: data.reference,
      status: event === "charge.success" ? "success" : "failed",
      raw: payload
    };
  }

  async refundPayment(data: RefundRequest): Promise<RefundResponse> {
    const res = await axios.post(
      `${this.baseUrl}/refund`,
      { transaction: data.paymentId, amount: (data.amount ?? 0) * 100 },
      { headers: this.headers }
    );
    const refund = res.data.data;
    return {
      refundId: refund.id,
      status: refund.status === "processing" ? "pending" : "success"
    };
  }

  verifyWebhookSignature(rawBody: any, headers: any): boolean {
    const signature = headers["x-paystack-signature"];
    return !!signature;
  }
}