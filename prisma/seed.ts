import { PrismaClient, UserRole, CourseStatus, DifficultyLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // 1. Seed Countries
  const countriesData = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
  ];

  console.log('Seeding countries...');
  for (const c of countriesData) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
  }

  const usCountry = await prisma.country.findUnique({ where: { code: 'US' } });

  // 2. Seed Admin User
  console.log('Seeding admin user...');
  const adminEmail = 'admin@yencoo.com';
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      firstName: 'System',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      countryId: usCountry?.id,
      // Note: hashedPassword should be generated via bcrypt, skipping for simple seed
    },
  });

  // 3. Seed Sample Courses (acting as Categories/Sample Data)
  console.log('Seeding sample courses...');
  const course1 = await prisma.course.upsert({
    where: { slug: 'getting-started-with-yencoo' },
    update: {},
    create: {
      title: 'Getting Started with Yencoo',
      slug: 'getting-started-with-yencoo',
      description: 'A comprehensive guide to using the Yencoo platform.',
      status: CourseStatus.PUBLISHED,
      difficultyLevel: DifficultyLevel.BEGINNER,
      modules: {
        create: [
          {
            title: 'Introduction',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Welcome to Yencoo',
                  order: 1,
                  isFree: true,
                },
                {
                  title: 'Platform Overview',
                  order: 2,
                  isFree: true,
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
