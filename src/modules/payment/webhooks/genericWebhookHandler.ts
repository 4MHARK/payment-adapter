import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import { logger } from "../../../config/logger";

export class GenericWebhookHandler {
  static async handle(req: Request, res: Response) {
    try {
      const provider = req.params.provider ?? "unknown";
      const eventId =
        req.body?.id ?? req.body?.data?.reference ?? Date.now().toString();

      await prisma.webhookEvent.create({
        data: {
          provider,
          eventId,
          status: "processed",
          payload: req.body
        }
      });

      logger.info(`Generic webhook stored from ${provider}`, eventId);
      res.sendStatus(200);
    } catch (err: any) {
      logger.error("Generic webhook error", err);
      res.status(400).send("Webhook error");
    }
  }
}