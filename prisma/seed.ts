import { UserRole, CourseStatus, DifficultyLevel } from '@prisma/client';
import "dotenv/config";
import { db as prisma } from '../src/lib/db';

async function main() {
  console.log('Starting seeding...');

  // 1. Seed Countries
  console.log('Seeding countries...');
  const countriesData = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
  ];

  for (const c of countriesData) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
  }
  const usCountry = await prisma.country.findUnique({ where: { code: 'US' } });

  // 2. Seed Languages
  console.log('Seeding languages...');
  const languagesData = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  for (const l of languagesData) {
    await prisma.language.upsert({
      where: { code: l.code },
      update: {},
      create: l,
    });
  }

  // 3. Seed Admin User
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
      // Note: hashedPassword should be generated via bcrypt in real scenarios.
    },
  });

  // 4. Seed Categories
  console.log('Seeding categories...');
  const devCategory = await prisma.category.upsert({
    where: { slug: 'development' },
    update: {},
    create: { name: 'Development', slug: 'development' },
  });

  const webCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: { name: 'Web Development', slug: 'web-development', parentId: devCategory.id },
  });

  // 5. Seed Sample Course
  console.log('Seeding sample courses...');
  const courseSlug = 'getting-started-with-yencoo';
  const course = await prisma.course.upsert({
    where: { slug: courseSlug },
    update: {},
    create: {
      title: 'Getting Started with Yencoo',
      slug: courseSlug,
      description: 'A comprehensive guide to using the Yencoo platform.',
      status: CourseStatus.PUBLISHED,
      difficultyLevel: DifficultyLevel.BEGINNER,
      categoryId: webCategory.id,
      price: 0,
      seoTitle: 'Getting Started with Yencoo',
      seoDescription: 'Learn how to use Yencoo platform effectively.',
      modules: {
        create: [
          {
            title: 'Introduction',
            order: 1,
            lessons: {
              create: [
                { title: 'Welcome to Yencoo', order: 1, isFree: true },
                { title: 'Platform Overview', order: 2, isFree: true }
              ]
            }
          }
        ]
      }
    }
  });

  // 6. Seed Sample Roadmap
  console.log('Seeding sample roadmap...');
  const roadmapSlug = 'frontend-developer';
  await prisma.roadmap.upsert({
    where: { slug: roadmapSlug },
    update: {},
    create: {
      title: 'Frontend Developer',
      slug: roadmapSlug,
      description: 'Learn the skills needed to become a modern Frontend Developer.',
      courses: {
        create: [
          {
            courseId: course.id,
            order: 1,
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
