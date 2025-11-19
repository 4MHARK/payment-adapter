import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "3000", 10),
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  REDIS_URL: process.env.REDIS_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "changeme",

  // Provider keys
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY ?? "",
  FLUTTERWAVE_SECRET_KEY: process.env.FLUTTERWAVE_SECRET_KEY ?? "",
  REMITA_API_KEY: process.env.REMITA_API_KEY ?? "",
  ACCESSBANK_API_KEY: process.env.ACCESSBANK_API_KEY ?? "",
  FIRSTBANK_API_KEY: process.env.FIRSTBANK_API_KEY ?? "",
  GTBANK_API_KEY: process.env.GTBANK_API_KEY ?? "",
  UBA_API_KEY: process.env.UBA_API_KEY ?? "",
  STANBIC_API_KEY: process.env.STANBIC_API_KEY ?? "",
  PREMIUMTRUST_API_KEY: process.env.PREMIUMTRUST_API_KEY ?? "",
  OPAY_API_KEY: process.env.OPAY_API_KEY ?? "",
  NIPSB_API_KEY: process.env.NIPSB_API_KEY ?? ""
};