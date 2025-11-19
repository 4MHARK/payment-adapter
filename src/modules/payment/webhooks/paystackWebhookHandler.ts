import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import { logger } from "../../../config/logger";

export class PaystackWebhookHandler {
  static async handle(req: Request, res: Response) {
    try {
      const payload = req.body;
      logger.info("Paystack webhook received", payload);

      await prisma.webhookEvent.create({
        data: {
          provider: "paystack",
          eventId: payload.data?.reference ?? Date.now().toString(),
          status: "processed",
          payload
        }
      });

      res.sendStatus(200);
    } catch (err: any) {
      logger.error("Paystack webhook error", err);
      res.status(400).send("Webhook error");
    }
  }
}