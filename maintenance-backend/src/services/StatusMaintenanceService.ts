import prisma from '../utils/db';

export class StatusMaintenanceService {
  async getAll() {
    return await prisma.status_maintenance.findMany();
  }

  async getById(id: number) {
    return await prisma.status_maintenance.findUnique({
      where: { id },
    });
  }

  async create(name: string, color: string, created_by: string) {
    return await prisma.status_maintenance.create({
      data: { name, color, created_by },
    });
  }

  async update(id: number, name?: string, color?: string, updated_by?: string) {
    return await prisma.status_maintenance.update({
      where: { id },
      data: { name, color, updated_by, updated_at: new Date() },
    });
  }

  async delete(id: number) {
    return await prisma.status_maintenance.delete({
      where: { id },
    });
  }
}