import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if there is existing data in urgency_maintenance
  const urgencyCount = await prisma.urgency_maintenance.count();
  if (urgencyCount === 0) {
    // Seed urgency_maintenance data
    await prisma.urgency_maintenance.createMany({
      data: [
        { name: 'Non Urgent', icon: 'emoticon_smile', color: 'green', sla_in_hours: null, next_status_maintenance_id: null, created_by: 'system' },
        { name: 'Less Urgent', icon: 'hammer', color: 'blue', sla_in_hours: 72, next_status_maintenance_id: 3, created_by: 'system' },
        { name: 'Urgent', icon: 'lightning', color: 'yellow', sla_in_hours: 6, next_status_maintenance_id: 4, created_by: 'system' },
        { name: 'Emergency', icon: 'fire', color: 'red', sla_in_hours: null, next_status_maintenance_id: null, created_by: 'system' },
      ],
    });
  } else {
    console.log('Urgency maintenance data already exists, skipping seeding.');
  }

  // Check if there is existing data in status_maintenance
  const statusCount = await prisma.status_maintenance.count();
  if (statusCount === 0) {
    // Seed status_maintenance data
    await prisma.status_maintenance.createMany({
      data: [
        { name: 'Open', color: 'grey', created_by: 'system' },
        { name: 'Pending', color: 'orange', created_by: 'system' },
        { name: 'Resolved', color: 'green', created_by: 'system' },
        { name: 'Mark as Resolved', color: 'blue', created_by: 'system' },
        // Add more statuses as needed
      ],
    });
  } else {
    console.log('Status maintenance data already exists, skipping seeding.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });