import { Request, Response } from "express";
import { PaymentService } from "../paymentService";
import { ApiError } from "../ApiError";
import { logger } from "../../../config/logger";

const service = new PaymentService();

export class SubscriptionController {
  static async createSubscription(req: Request, res: Response) {
    try {
      const { provider, ...data } = req.body;
      if (!provider) throw ApiError.badRequest("Provider is required");

      const result = await service.createSubscription(provider, data);
      logger.info({ provider, result }, "Subscription created");

      res.json({ success: true, data: result });
    } catch (err: any) {
      logger.error("Create subscription error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async cancelSubscription(req: Request, res: Response) {
    try {
      const { provider, subscriptionId } = req.body;
      if (!provider || !subscriptionId)
        throw ApiError.badRequest("provider and subscriptionId are required");

      const result = await service.cancelSubscription(provider, subscriptionId);
      logger.info(`Subscription cancelled on ${provider}`, result);
      res.json({ success: true, data: result });
    } catch (err: any) {
      logger.error("Cancel subscription error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }
}