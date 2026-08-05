import { UserRole, CourseStatus, DifficultyLevel, LessonType } from '@prisma/client';
import "dotenv/config";
import { db as prisma } from '../src/lib/db';
import { MOCK_CATEGORIES, MOCK_COURSES, MOCK_COURSE_MODULES } from '../src/lib/mock-data';

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

  // 3. Seed Admin and Test User
  console.log('Seeding users...');
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
    },
  });

  const testUserEmail = 'test@yencoo.com';
  const testUser = await prisma.user.upsert({
    where: { email: testUserEmail },
    update: {},
    create: {
      email: testUserEmail,
      firstName: 'Test',
      lastName: 'Student',
      role: UserRole.USER,
      countryId: usCountry?.id,
    },
  });

  // 4. Seed Categories
  console.log('Seeding categories from mock data...');
  for (const cat of MOCK_CATEGORIES) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name, slug: cat.name.toLowerCase().replace(/\s+/g, '-') },
    });
  }

  // 5. Seed Courses and Modules
  console.log('Seeding courses and modules from mock data...');
  for (const courseData of MOCK_COURSES) {
    const category = await prisma.category.findFirst({ where: { name: courseData.category.name } });

    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {
        title: courseData.title,
        description: courseData.description,
        thumbnailUrl: courseData.thumbnailUrl,
        status: courseData.status as CourseStatus,
        difficultyLevel: courseData.difficultyLevel as DifficultyLevel,
        price: courseData.price,
      },
      create: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        thumbnailUrl: courseData.thumbnailUrl,
        status: courseData.status as CourseStatus,
        difficultyLevel: courseData.difficultyLevel as DifficultyLevel,
        price: courseData.price,
        categoryId: category?.id,
        seoTitle: courseData.title,
        seoDescription: courseData.description?.substring(0, 150) || '',
        learningOutcomes: courseData.learningOutcomes || [],
      }
    });

    // Seed modules if this course has them
    const courseModules = MOCK_COURSE_MODULES.filter(m => m.courseId === courseData.id);
    for (const mod of courseModules) {
      const moduleRecord = await prisma.courseModule.upsert({
        where: { courseId_order: { courseId: course.id, order: mod.order } },
        update: { title: mod.title },
        create: {
          courseId: course.id,
          title: mod.title,
          order: mod.order,
        }
      });

      // Seed lessons
      if (mod.lessons) {
        for (let i = 0; i < mod.lessons.length; i++) {
          const lessonData = mod.lessons[i];
          const lessonRecord = await prisma.lesson.upsert({
            where: { moduleId_order: { moduleId: moduleRecord.id, order: i + 1 } },
            update: {
              title: lessonData.title,
              type: lessonData.type as LessonType,
              isFree: lessonData.isFree,
            },
            create: {
              moduleId: moduleRecord.id,
              title: lessonData.title,
              type: lessonData.type as LessonType,
              order: i + 1,
              isFree: lessonData.isFree,
              content: `<p>This is the content for ${lessonData.title}.</p>`,
            }
          });

          if (lessonData.type === 'QUIZ') {
            const quiz = await prisma.quiz.upsert({
              where: { lessonId: lessonRecord.id },
              update: {},
              create: {
                lessonId: lessonRecord.id,
                passingScore: 80,
              }
            });

            // Seed a sample question if none exists
            const existingQuestions = await prisma.quizQuestion.count({ where: { quizId: quiz.id } });
            if (existingQuestions === 0) {
              const question = await prisma.quizQuestion.create({
                data: {
                  quizId: quiz.id,
                  text: 'What is a Server Component in Next.js 14?',
                  order: 1,
                  explanation: 'Server Components run only on the server, resulting in zero client-side JavaScript for those components.',
                }
              });

              await prisma.quizOption.createMany({
                data: [
                  { questionId: question.id, text: 'A component that only renders on the client', isCorrect: false },
                  { questionId: question.id, text: 'A component that runs exclusively on the server', isCorrect: true },
                  { questionId: question.id, text: 'A database ORM', isCorrect: false },
                  { questionId: question.id, text: 'A styling framework', isCorrect: false },
                ]
              });
            }
          }
        }
      }
    }
    
    // Seed enrollment for test user for course_1 so progress works
    if (courseData.id === "course_1") {
      await prisma.enrollment.upsert({
        where: { userId_courseId: { userId: testUser.id, courseId: course.id } },
        update: {},
        create: {
          userId: testUser.id,
          courseId: course.id,
        }
      });
    }
  }

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
