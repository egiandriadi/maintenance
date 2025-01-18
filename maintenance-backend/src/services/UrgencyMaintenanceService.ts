import prisma from '../utils/db';

export class UrgencyMaintenanceService {
  async getAll() {
    return await prisma.urgency_maintenance.findMany();
  }

  async getById(id: number) {
    return await prisma.urgency_maintenance.findUnique({
      where: { id },
    });
  }

  async create(name: string, color: string, icon: string, created_by: string) {
    return await prisma.urgency_maintenance.create({
      data: { name, color, icon, created_by },
    });
  }

  async update(id: number, name?: string, color?: string, icon?: string,updated_by?: string) {
    return await prisma.urgency_maintenance.update({
      where: { id },
      data: { name, color, icon, updated_by, updated_at: new Date() },
    });
  }

  async delete(id: number) {
    return await prisma.urgency_maintenance.delete({
      where: { id },
    });
  }
}