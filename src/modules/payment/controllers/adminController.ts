import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import { logger } from "../../../config/logger";
import { ApiError } from "../ApiError";

export class AdminController {
  static async listTransactions(req: Request, res: Response) {
    try {
      const payments = await prisma.payment.findMany({
        orderBy: { createdAt: "desc" }
      });
      res.json({ success: true, payments });
    } catch (err: any) {
      logger.error("List transactions error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal("DB error");
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async retryWebhook(req: Request, res: Response) {
    try {
      const { webhookId } = req.body;
      if (!webhookId) throw ApiError.badRequest("webhookId is required");

      // For now, just log.  Step 9 will push this into BullMQ.
      logger.info({ webhookId }, "Webhook retry requested");
      res.json({
        success: true,
        message: `Webhook ${webhookId} queued for retry`
      });
    } catch (err: any) {
      logger.error("Retry webhook error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal("Retry error");
      res.status(error.statusCode).json(error.toResponse());
    }
  }
}