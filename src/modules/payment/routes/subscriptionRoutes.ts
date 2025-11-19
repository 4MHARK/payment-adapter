import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController";

const router = Router();

// POST /api/subscriptions/create
router.post("/create", SubscriptionController.createSubscription);

// POST /api/subscriptions/cancel
router.post("/cancel", SubscriptionController.cancelSubscription);

export default router;