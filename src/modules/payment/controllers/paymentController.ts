import { Request, Response } from "express";
import { PaymentService } from "../paymentService";
import { logger } from "../../../config/logger";
import { ApiError } from "../ApiError";

const service = new PaymentService();

export class PaymentController {
  static async initiatePayment(req: Request, res: Response) {
    try {
      const { provider, ...data } = req.body;

      if (!provider) throw ApiError.badRequest("Provider is required");

      const result = await service.initPayment(provider, data);
      logger.info({ result }, "Refund processed");

      res.json({ success: true, provider, data: result });
    } catch (err: any) {
      logger.error("Failed to initiate payment", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async confirmPayment(req: Request, res: Response) {
    try {
      const { provider, payload } = req.body;
      if (!provider) throw ApiError.badRequest("Provider is required");

      const confirmation = await service.confirmPayment(provider, payload);
      logger.info({ confirmation }, "Payment confirmation received");

      res.json({ success: true, data: confirmation });
    } catch (err: any) {
      logger.error("Confirmation error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async refundPayment(req: Request, res: Response) {
    try {
      const { provider, ...data } = req.body;
      if (!provider) throw ApiError.badRequest("Provider is required");

      const result = await service.refundPayment(provider, data);
      logger.info({ provider, result }, "Payment initiated");

      res.json({ success: true, result });
    } catch (err: any) {
      logger.error("Refund error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async listProviders(req: Request, res: Response) {
    const { listProviders } = await import("../providerRegistry");
    res.json({ success: true, providers: listProviders() });
  }
}