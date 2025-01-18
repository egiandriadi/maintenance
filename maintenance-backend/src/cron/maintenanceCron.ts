// src/cron/maintenanceCron.ts

import cron from 'node-cron';
import prisma from '../utils/db';
import dotenv from 'dotenv';

dotenv.config();

const cronSchedule = process.env.CRON_SCHEDULE || '0 * * * *'; // Default to every hour

async function updateMaintenanceRequests() {
  try {
    const now = new Date();

    // Select maintenance requests with the specified urgency and SLA conditions
    const requests = await prisma.maintenance_request.findMany({
      where: {
        urgency_maintenance: {
          name: {
            in: ['Less Urgent', 'Urgent'],
          },
        },
        updated_at: {
          lte: new Date(now.getTime() - 60 * 60 * 1000), // 1 hour ago
        },
      },
      include: {
        urgency_maintenance: true,
      },
    });

    for (const request of requests) {
      const slaInHours = request.urgency_maintenance.sla_in_hours || 0;
      const slaDate = new Date(request.updated_at.getTime() + slaInHours * 60 * 60 * 1000);

      if (slaDate <= now && request.urgency_maintenance.next_status_maintenance_id !== null) {
        // Update the status_maintenance_id and updated_at
        await prisma.maintenance_request.update({
          where: { id: request.id },
          data: {
            status_maintenance_id: request.urgency_maintenance.next_status_maintenance_id,
            updated_at: now,
          },
        });
      }
    }

    console.log('Maintenance requests updated successfully.');
  } catch (error) {
    console.error('Error updating maintenance requests:', error);
  }
}

// Schedule the cron job
cron.schedule(cronSchedule, updateMaintenanceRequests);