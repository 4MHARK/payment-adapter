import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import { ApiError } from "../ApiError";
import { logger } from "../../../config/logger";

export class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    try {
      const { email, name, userId } = req.body;
      if (!email) throw ApiError.badRequest("Email is required");

      const customer = await prisma.customer.create({
        data: { email, name, userId }
      });

      logger.info({ customer }, "Customer created");
      res.json({ success: true, customer });
    } catch (err: any) {
      logger.error("Create customer error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }

  static async listPaymentMethods(req: Request, res: Response) {
    try {
      const { customerId } = req.params;
      if (!customerId) throw ApiError.badRequest("customerId param required");

      const methods = await prisma.paymentMethod.findMany({
        where: { customerId }
      });

      res.json({ success: true, methods });
    } catch (err: any) {
      logger.error("List payment methods error", err);
      const error =
        err instanceof ApiError ? err : ApiError.internal(err.message);
      res.status(error.statusCode).json(error.toResponse());
    }
  }
}