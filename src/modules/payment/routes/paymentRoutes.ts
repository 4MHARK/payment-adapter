import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const router = Router();

router.post("/initiate", PaymentController.initiatePayment);
router.post("/confirm", PaymentController.confirmPayment);
router.post("/refund", PaymentController.refundPayment);
router.post("/providers", PaymentController.listProviders);

export default router;