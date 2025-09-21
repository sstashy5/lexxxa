import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = Number(process.env.PASSWORD_SALT_ROUNDS ?? 12);

  const demoEmail = "demo@lexa.local";
  const demoPass = "demo1234";
  const adminEmail = "admin@lexa.local";
  const adminPass = "admin1234";

  const demoHash = await bcrypt.hash(demoPass, saltRounds);
  const adminHash = await bcrypt.hash(adminPass, saltRounds);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      passwordHash: demoHash,
      displayName: "Demo User",
      balance: 5000,
      role: "user",
    },
  });

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      displayName: "Admin",
      balance: 100000,
      role: "admin",
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seeded users:");
  // eslint-disable-next-line no-console
  console.log(`- ${demoEmail} / ${demoPass}`);
  // eslint-disable-next-line no-console
  console.log(`- ${adminEmail} / ${adminPass}`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });