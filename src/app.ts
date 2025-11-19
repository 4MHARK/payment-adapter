import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { idempotency } from "./middleware/idempotency";

const app = express();

// 1️⃣ Parse JSON for ALL normal API endpoints
app.use(express.json());

// 2️⃣ Raw body ONLY for webhook routes (Stripe, Paystack, etc.)
app.use("/api/webhooks", express.raw({ type: "*/*" }));

// 3️⃣ Security middleware
app.use(cors());
app.use(helmet());

// 4️⃣ Idempotency must run AFTER JSON parsing
app.use(idempotency);

// 5️⃣ Main API routes
app.use("/api", routes);

export default app;