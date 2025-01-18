import prisma from '../utils/db';

export class MaintenanceRequestService {
  async getOpenRequestsCount() {
    return await prisma.maintenance_request.count({
      where: {
        status_maintenance: {
          name: 'Open',
        },
      },
    });
  }

  async getUrgentRequestsCount() {
    return await prisma.maintenance_request.count({
      where: {
        urgency_maintenance: {
          name: {
            in: ['Urgent', 'Emergency'],
          },
        },
      },
    });
  }

  async getAverageResolutionTime() {
    const result = await prisma.$queryRaw<{ avgResolutionTime: number }[]>`
      SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600) AS "avgResolutionTime"
      FROM "maintenance_request"
      WHERE "status_maintenance_id" IN (
        SELECT id FROM "status_maintenance" WHERE name IN ('Resolved', 'Mark as Resolved')
      )
    `;

    const avgResolutionTime = result[0]?.avgResolutionTime || 0;

    // Convert to integer
    return Math.round(avgResolutionTime); // Use Math.floor or Math.ceil if needed
  }

  async getAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [data, total] = await Promise.all([
      prisma.maintenance_request.findMany({
        skip,
        take,
        orderBy: { id: 'asc' },
        include: {
          status_maintenance: true,
          urgency_maintenance: true,
        },
      }),
      prisma.maintenance_request.count(),
    ]);

    return { data, total, page, pageSize };
  }

  async getById(id: number) {
    return await prisma.maintenance_request.findUnique({
      where: { id },
      include: {
        status_maintenance: true,
        urgency_maintenance: true,
      },
    });
  }

  async create(title: string, description: string, status_maintenance_id: number, urgency_maintenance_id: number, created_by: string) {
    return await prisma.maintenance_request.create({
      data: { title, description, status_maintenance_id, urgency_maintenance_id, created_by },
    });
  }

  async update(id: number, title?: string, description?: string, status_maintenance_id?: number, urgency_maintenance_id?: number, updated_by?: string) {
    return await prisma.maintenance_request.update({
      where: { id },
      data: { title, description, status_maintenance_id, urgency_maintenance_id, updated_by, updated_at: new Date() },
    });
  }

  async updateStatus(id: number, status_maintenance_id?: number, updated_by?: string) {
    return await prisma.maintenance_request.update({
      where: { id },
      data: { status_maintenance_id, updated_by, updated_at: new Date() },
    });
  }

  async delete(id: number) {
    return await prisma.maintenance_request.delete({
      where: { id },
    });
  }
}