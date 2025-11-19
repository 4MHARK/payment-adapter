import { Router } from "express";
import { AdminController } from "../controllers/adminController";

const router = Router();

router.get("/transactions", AdminController.listTransactions);
router.post("/webhooks/retry", AdminController.retryWebhook);

export default router;   // ✅ this line is required