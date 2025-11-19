import { Router } from "express";
import { CustomerController } from "../controllers/customerController";

const router = Router();

router.post("/create", CustomerController.createCustomer);
router.get("/:customerId/methods", CustomerController.listPaymentMethods);

export default router;