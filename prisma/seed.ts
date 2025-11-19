import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- DEMO CUSTOMERS ---
  const customers = ["alice", "bob", "charlie", "diana", "eve"];
  for (const name of customers) {
    await prisma.customer.create({
      data: {
        email: `${name}@example.com`,
        name: name[0].toUpperCase() + name.slice(1)
      }
    });
  }
  console.log("✔ Customers created");

  // --- PAYMENT PROVIDERS ---
  const providerNames = [
    "stripe",
    "paystack",
    "flutterwave",
    "remita",
    "accessbank",
    "firstbank",
    "gtbank",
    "uba",
    "stanbic",
    "premiumtrust",
    "opay",
    "nipsb"
  ];

  for (const name of providerNames) {
    await prisma.paymentProvider.create({
      data: {
        name,
        enabled: true,
        accounts: {
          create: {
            merchantKey: `merchant_${name}_demo`,
            secretKey: `secret_${name}_demo`,
            publicKey: `public_${name}_demo`
          }
        }
      }
    });
  }

  console.log("✔ Providers created");
  console.log("🎉 Database seed successful");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });