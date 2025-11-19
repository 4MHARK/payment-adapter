import { registerProvider } from "./providerRegistry";

// Full providers
import { StripeAdapter } from "./adapters/stripeAdapter";
import { PaystackAdapter } from "./adapters/paystackAdapter";

// Banks and fintechs (scaffolds)
import { AccessBankAdapter } from "./adapters/accessbankAdapter";
import { FirstBankAdapter } from "./adapters/firstbankAdapter";
import { GtbankAdapter } from "./adapters/gtbankAdapter";
import { UbaAdapter } from "./adapters/ubaAdapter";
import { StanbicAdapter } from "./adapters/stanbicAdapter";
import { PremiumtrustAdapter } from "./adapters/premiumtrustAdapter";
import { OpayAdapter } from "./adapters/opayAdapter";
import { NipsbAdapter } from "./adapters/nipsbAdapter";
import { FlutterwaveAdapter } from "./adapters/flutterwaveAdapter";
import { RemitaAdapter } from "./adapters/remitaAdapter";

/**
 * Initializes and registers all available providers.
 * This should run once when the application starts.
 */
export function initPaymentModule() {
  // Core gateways
  registerProvider(new StripeAdapter());
  registerProvider(new PaystackAdapter());

  // Bank adapters
  registerProvider(new AccessBankAdapter());
  registerProvider(new FirstBankAdapter());
  registerProvider(new GtbankAdapter());
  registerProvider(new UbaAdapter());
  registerProvider(new StanbicAdapter());
  registerProvider(new PremiumtrustAdapter());

  // Fintechs / Switches
  registerProvider(new OpayAdapter());
  registerProvider(new NipsbAdapter());
  registerProvider(new FlutterwaveAdapter());
  registerProvider(new RemitaAdapter());
}