import { Router } from "express";
import { StripeWebhookHandler } from "../webhooks/stripeWebhookHandler";
import { PaystackWebhookHandler } from "../webhooks/paystackWebhookHandler";
import { GenericWebhookHandler } from "../webhooks/genericWebhookHandler";

const router = Router();

router.post("/stripe", StripeWebhookHandler.handle);
router.post("/paystack", PaystackWebhookHandler.handle);

// fallback for others: /api/webhooks/flutterwave, etc.
router.post("/:provider", GenericWebhookHandler.handle);

export default router;