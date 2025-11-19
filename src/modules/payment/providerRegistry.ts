import { PaymentProviderAdapter } from "./types";

const providers: Record<string, PaymentProviderAdapter> = {};

export function registerProvider(adapter: PaymentProviderAdapter) {
  providers[adapter.name.toLowerCase()] = adapter;
}

export function getProvider(name: string): PaymentProviderAdapter {
  const provider = providers[name.toLowerCase()];
  if (!provider) throw new Error(`Payment provider not registered: ${name}`);
  return provider;
}

export function listProviders() {
  return Object.keys(providers);
}