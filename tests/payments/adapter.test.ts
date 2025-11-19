import { PaystackAdapter } from "../../src/modules/payment/adapters/paystackAdapter";

test("Paystack adapter has required methods", () => {
  const adapter = new PaystackAdapter();

  expect(adapter.name).toBe("paystack");
  expect(typeof adapter.initPayment).toBe("function");
  expect(typeof adapter.confirmPayment).toBe("function");
});