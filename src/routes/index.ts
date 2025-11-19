import { Router } from "express";
import paymentRoutes from "../modules/payment/routes/paymentRoutes";
import subscriptionRoutes from "../modules/payment/routes/subscriptionRoutes";
import customerRoutes from "../modules/payment/routes/customerRoutes";
import adminRoutes from "../modules/payment/routes/adminRoutes";
import webhookRoutes from "../modules/payment/routes/webhookRoutes";
import { listProviders } from "../modules/payment/providerRegistry";
import { initPaymentModule } from "../modules/payment/paymentModule";

const router = Router();

// Initialize all providers
initPaymentModule();

// Health check
router.get("/health", (req, res) =>
  res.json({ status: "ok", time: Date.now() })
);

// List providers
router.get("/providers", (req, res) =>
  res.json({ providers: listProviders() })
);

// Mount all routes
router.use("/payments", paymentRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/customers", customerRoutes);
router.use("/admin", adminRoutes);
router.use("/webhooks", webhookRoutes);

export default router;