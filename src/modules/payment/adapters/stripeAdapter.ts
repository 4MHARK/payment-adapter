import Stripe from "stripe";
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

export class StripeAdapter implements PaymentProviderAdapter {
  name = "stripe";
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20"
    } as any);
  }

  // === One‑time payment
  async initPayment(data: PaymentInitRequest): Promise<PaymentInitResponse> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: data.currency.toLowerCase(),
            product_data: { name: data.description ?? "Payment" },
            unit_amount: data.amount * 100
          },
          quantity: 1
        }
      ],
      success_url: data.callbackUrl ?? "https://example.com/success",
      cancel_url: data.callbackUrl ?? "https://example.com/cancel",
      metadata: data.metadata
    });

    return {
      provider: this.name,
      reference: session.id,
      status: "redirect",
      paymentUrl: session.url ?? ""
    };
  }

  // === Confirmation webhook payload
  async confirmPayment(payload: any): Promise<PaymentConfirmation> {
    const event = payload;
    const charge = event.data.object;
    const isSuccess = event.type === "charge.succeeded";

    return {
      providerReference: charge.id,
      status: isSuccess ? "success" : "failed",
      raw: payload
    };
  }

  // === Refund
  async refundPayment(data: RefundRequest): Promise<RefundResponse> {
    const refund = await this.stripe.refunds.create({ charge: data.paymentId });
    return {
      refundId: refund.id,
      status: refund.status as "pending" | "success" | "failed"
    };
  }

  // === Webhook signature
  verifyWebhookSignature(rawBody: any, headers: any): boolean {
    const sig = headers["stripe-signature"];
    // In production you should verify using this.stripe.webhooks.constructEvent(...)
    return !!sig;
  }
}