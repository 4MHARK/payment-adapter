🔌 Gateway Providers

1. Paystack (Fully Implemented)

Field	Value
Status	✅ Full
Env Vars	PAYSTACK_SECRET_KEY
Supports	One‑time payments, Redirect checkout, Webhooks, Refunds
File	paystackAdapter.ts

Notes

- Uses official REST API

- Works with test and live keys

- Fully integrated with controllers and idempotency middleware


---

2. Stripe (Fully implemented in architecture / partial code scaffold)

Field	Value
Status	⚙️ Ready
Env Vars	STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
Supports	One‑time payments, Subscriptions, Refunds, Webhooks
File	stripeAdapter.ts

Notes

- Template includes SDK usage and webhook signature verification

- Add subscription plan IDs from Stripe dashboard


---

3. Flutterwave (Scaffold)

Field	Value
Status	🔧 Scaffold
Env Vars	FLUTTERWAVE_SECRET_KEY
Supports	Redirect payments (todo)
File	flutterwaveAdapter.ts

Notes

- Replace mock initPayment() with call to /payments endpoint


---

4. Remita (Scaffold)

Field	Value
Status	🔧 Scaffold
Env Vars	REMITA_API_KEY, REMITA_MERCHANT_ID
Supports	RRR billing, Interswitch switch flows (todo)
File	remitaAdapter.ts

---

🏦 Bank Providers (Scaffolds)


These adapters provide typed scaffolds ready for real integration with Nigerian bank payment gateways.

All follow the same structure:


- initPayment() → create a payment session

- confirmPayment() → verify transaction status

- verifyWebhookSignature() → validate bank event callbacks


---

5. Access Bank

Field	Value
Status	🔧 Scaffold
Env Vars	ACCESSBANK_API_KEY
File	accessbankAdapter.ts

---

6. First Bank

Field	Value
Status	🔧 Scaffold
Env Vars	FIRSTBANK_API_KEY
File	firstbankAdapter.ts

---

7. GTBank

Field	Value
Status	🔧 Scaffold
Env Vars	GTBANK_API_KEY
File	gtbankAdapter.ts

---

8. UBA

Field	Value
Status	🔧 Scaffold
Env Vars	UBA_API_KEY
File	ubaAdapter.ts

---

9. Stanbic IBTC

Field	Value
Status	🔧 Scaffold
Env Vars	STANBIC_API_KEY
File	stanbicAdapter.ts

---

10. Premium Trust Bank

Field	Value
Status	🔧 Scaffold
Env Vars	PREMIUMTRUST_API_KEY
File	premiumtrustAdapter.ts

---

11. OPay

Field	Value
Status	🔧 Scaffold
Env Vars	OPAY_API_KEY
File	opayAdapter.ts

---

12. NIPSB (NIBSS Instant Payment Switch)

Field	Value
Status	🔧 Scaffold
Env Vars	NIPSB_API_KEY
File	nipsbAdapter.ts

---

🔄 Integration Notes

1️⃣ All providers must export a class implementing:

	interface PaymentProviderAdapter {
	  name: string;
	  initPayment(...): Promise<PaymentInitResponse>;
	  confirmPayment(...): Promise<PaymentConfirmation>;
	  refundPayment?(...): Promise<RefundResponse>;
	  createSubscription?(...): Promise<any>;
	  cancelSubscription?(...): Promise<any>;
	  verifyWebhookSignature?(rawBody, headers): boolean;
	}

2️⃣ All provider adapters are registered in:

	paymentModule.ts

3️⃣ You can enable/disable providers dynamically in DB table:

	PaymentProvider

4️⃣ Each provider has its own account configuration in:

	ProviderAccount


---

✨ Future Enhancements

- Add real HTTP integrations for banks

- Add FLW payments (/v3/payments)

- Add Remita RRR creation

- Add signature verification logic

- Add provider fallback strategies

- Add end‑to‑end tests

- Add metric dashboards for providers