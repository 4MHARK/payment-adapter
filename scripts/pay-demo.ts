import axios from "axios";

// Utility: read CLI args like: node pay-demo.ts amount=5000 provider=flutterwave
function getArg(key: string, defaultValue?: string) {
  const arg = process.argv.find(a => a.startsWith(key + "="));
  return arg ? arg.split("=")[1] : defaultValue;
}

async function runDemo() {
  console.log("========================================");
  console.log("🧠 The Agentic Brain — Payment CLI Demo");
  console.log("========================================");

  // CLI arguments (optional)
  const provider = getArg("provider", "paystack");
  const amount = Number(getArg("amount", "2000"));
  const currency = getArg("currency", "NGN");
  const callbackUrl = getArg("callback", "https://example.com/return");

  const payload = {
    provider,
    amount,
    currency,
    customerId: "cli_demo_user",
    reference: "cli_ref_" + Date.now(),
    callbackUrl
  };

  console.log("➡️ Creating payment with:");
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      "http://localhost:3000/api/payments/initiate",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": "CLI_DEMO_" + Date.now()
        },
        timeout: 10000
      }
    );

    console.log("\n✅ Payment Initialized Successfully!");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err: any) {
    console.error("\n❌ Payment Initialization Failed");

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Response:", err.response.data);
    } else if (err.request) {
      console.error("No response received from server.");
    } else {
      console.error("Unexpected error:", err.message);
    }
  }

  console.log("========================================");
}

runDemo();
