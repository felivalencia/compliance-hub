import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const customers = [
    {
      name: "María López",
      curp: "LOPM800101MDFXXX01",
      rfc: "LOPM800101XXX",
      occupation: "Arquitecta",
      riskScore: 10,
      status: "Verified",
    },
    {
      name: "Juan Pérez",
      curp: "PEJJ900202HDFXXX02",
      rfc: "PEJJ900202XXX",
      occupation: "Comerciante",
      riskScore: 35,
      status: "Pending",
    },
    {
      name: "Ana Rodríguez",
      curp: "RODA850303MDFXXX03",
      rfc: "RODA850303XXX",
      occupation: "Empresaria",
      riskScore: 65,
      status: "Review",
    },
  ];

  for (const customerData of customers) {
    const customer = await prisma.customer.upsert({
      where: { curp: customerData.curp! },
      update: customerData,
      create: customerData,
    });
    console.log(`  ✓ Customer: ${customer.name} (${customer.status})`);
  }

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
