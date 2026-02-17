const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword, // In real app should be hashed
      name: 'Test Student',
      semesters: {
        create: {
          name: 'Semester 1',
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
          subjects: {
            create: [
              {
                courseName: 'Mathematics',
                courseCode: 'MATH101',
                classesPerWeek: 4,
                maxAllowedAbsences: 5,
                totalClassesConducted: 20,
                totalClassesAttended: 18,
                requiredPercentage: 75
              },
              {
                courseName: 'Physics',
                courseCode: 'PHY101',
                classesPerWeek: 3,
                maxAllowedAbsences: 4,
                totalClassesConducted: 15,
                totalClassesAttended: 10,
                requiredPercentage: 75
              }
            ]
          }
        }
      }
    }
  });
  console.log('Seeded User:', user);
}
main()
  .catch(e => { throw e })
  .finally(async () => { await prisma.$disconnect() })
