# 🧠 The Agentic Brain – Unified Payment Integration Engine

A production‑grade, modular payment gateway built with:

- **Node.js (TypeScript)**
- **Express.js**
- **PostgreSQL (Prisma ORM)**
- **Redis (idempotency + caching + queues)**
- **BullMQ (webhook retries & background jobs)**
- **Docker**
- **OpenAPI (Swagger)**
- **Postman Collection**

It supports both **gateway providers** and **Nigerian banks/fintechs**:

| Provider | Status | Notes |
|----------|--------|--------|
| Paystack | ✅ Full | Working REST integration |
| Stripe | ⚙️ Ready | SDK + webhook scaffold |
| Flutterwave | 🔧 Scaffold | Ready for full integration |
| Remita | 🔧 Scaffold | RRR billing flow |
| Access Bank | 🔧 Scaffold | Corporate |
| First Bank | 🔧 Scaffold | Corporate |
| GTBank | 🔧 Scaffold | Corporate |
| UBA | 🔧 Scaffold | Corporate |
| Stanbic IBTC | 🔧 Scaffold | Corporate |
| Premium Trust Bank | 🔧 Scaffold | Basic flows |
| OPay | 🔧 Scaffold | Collections API |
| NIPSB | 🔧 Scaffold | Instant payments |

---

# 🚀 Getting Started (Local Development)

## 1. Clone the project
```
git clone <repo-url>
cd Payment-integration
```

## 2. Install dependencies
```
npm install
```

## 3. Configure .env
Copy `.env.example` → `.env` and set your values:

```
DATABASE_URL=postgresql://agentic:password@localhost:5432/agentic_payments
REDIS_URL=redis://localhost:6379

PAYSTACK_SECRET_KEY=sk_test_xxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxx
FLUTTERWAVE_SECRET_KEY=
REMITA_API_KEY=
ACCESSBANK_API_KEY=
FIRSTBANK_API_KEY=
GTBANK_API_KEY=
UBA_API_KEY=
STANBIC_API_KEY=
PREMIUMTRUST_API_KEY=
OPAY_API_KEY=
NIPSB_API_KEY=
```

> 💡 For Paystack, use the **secret key**, not the public key.

---

# 🐳 Run Postgres & Redis in Docker

Start services:
```
docker-compose up -d postgres redis
```

Verify:
```
docker ps
```

---

# ▶️ Start the API
```
npm run dev
```

Expected startup:

```
Paystack Secret Key Loaded: yes
BullMQ workers initialized
Server running on port 3000
Redis connected
```

Your API is now live at:
```
http://localhost:3000/api
```

---

# 🧪 Testing the API

## Health check
```
GET http://localhost:3000/api/health
```

## List providers
```
GET http://localhost:3000/api/payments/providers
```

## Initiate payment (Paystack)
**POST**  
```
http://localhost:3000/api/payments/initiate
```

Headers:
```
Content-Type: application/json
Idempotency-Key: TEST123
```

Body:
```json
{
  "provider": "paystack",
  "amount": 5000,
  "currency": "NGN",
  "customerId": "demo_123",
  "reference": "ref_xyz",
  "callbackUrl": "https://example.com"
}
```

---

# 🧰 CLI Demo Script

Run the end‑to‑end payment initializer:

```
npx ts-node scripts/pay-demo.ts
```

Expected output:
```
Payment initialized successfully!
paymentUrl: https://checkout.paystack.com/xxxx
```

---

# 📘 API Documentation

## OpenAPI / Swagger  
The entire API is documented in:

```
openapi.yaml
```

Import into:

- SwaggerHub
- Redoc
- Insomnia
- Postman

---

## Postman Collection  
Import:

```
postman_collection.json
```

Includes:

- Health  
- Providers  
- Create Payment  
- Confirm Payment  
- Refund  
- Create Customer  

---

# 🗄 Database (Prisma ORM)

### View database in Prisma Studio
```
npx prisma studio
```

### Run migrations
```
npx prisma migrate dev --name init
```

### Seed demo data
```
npx prisma db seed
```

---

# 🔁 Background Jobs (BullMQ)
BullMQ handles:

- Webhook retries  
- Async provider operations  

Workers start automatically:

```
BullMQ workers initialized
```

---

# 🔒 Security
The system does **not** store or process raw card numbers (PAN/CVV).  
This keeps you in **PCI SAQ‑A** compliance.

Security layers included:

- Idempotency keys  
- Redis locks  
- Webhook signature verification (Stripe-ready)  
- Separate raw body parsing for webhooks  
- Server-side input validation  

---

# 📦 Project Structure

```
src
 ├─ app.ts
 ├─ server.ts
 ├─ config/
 ├─ db/
 ├─ jobs/
 ├─ middleware/
 ├─ modules/
 │    └─ payment/
 │         ├─ adapters/
 │         ├─ controllers/
 │         ├─ routes/
 │         ├─ webhooks/
 │         ├─ types.ts
 │         ├─ paymentService.ts
 │         ├─ providerRegistry.ts
 │         └─ paymentModule.ts
 └─ routes/
prisma/
scripts/
docs/
```

---

# 🛠 Deployment

### Using Docker (Production)
```
docker-compose up --build
```

### Or build image
```
docker build -t agentic-brain-api .
```

Deployable to:

- AWS ECS  
- Railway  
- Render  
- Azure Container Apps  
- Digital Ocean  

---

# 🧹 Next Steps
- Complete more bank adapters  
- Add real webhook signatures (Stripe, Paystack, Flutterwave)  
- Add logging to Sentry  
- Add Jest integration tests  
- Add BullMQ dashboard  
- Add rate limiting  

---

# 🧠 Maintainers
Built with ❤️ for modern organizations.