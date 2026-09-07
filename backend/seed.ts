import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial setup...');

  // Create Super Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@quantum.edu' },
    update: {},
    create: {
      email: 'admin@quantum.edu',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
    },
  });

  const institution = await prisma.institution.create({
    data: {
      name: 'Quantum School & College',
      setupComplete: true,
      address: 'Dhaka, Bangladesh',
      contactEmail: 'contact@quantum.edu'
    }
  });

  // Create Notices
  await prisma.notice.create({
    data: {
      title: 'Term 2 Examinations Schedule',
      content: 'The Term 2 Terminal Examinations will begin strictly on the 10th of next month...',
      category: 'ACADEMIC',
      targetAudience: 'ALL',
      isPinned: true
    }
  });

  // Create Events
  await prisma.eventNews.create({
    data: {
      title: 'Annual Science Fair 2025',
      description: 'Join us for the most awaited science exhibition where students showcase incredible prototypes.',
      type: 'EVENT',
      date: new Date(),
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
