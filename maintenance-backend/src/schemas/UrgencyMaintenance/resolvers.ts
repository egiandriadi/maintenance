// src/schema/resolvers.ts

import { UrgencyMaintenanceController } from '../../controllers/UrgencyMaintenanceController';

const controller = new UrgencyMaintenanceController();

export const resolversUrgencyMaintenance = {
  Query: {
    getUrgencyMaintenances: async () => {
      return await controller.getAll();
    },
    getUrgencyMaintenance: async (_: any, args: { id: number }) => {
      return await controller.getById(args.id);
    },
  },
  Mutation: {
    createUrgencyMaintenance: async (_: any, args: { name: string; color: string; icon: string; created_by: string }) => {
      return await controller.create(args.name, args.color, args.icon, args.created_by);
    },
    updateUrgencyMaintenance: async (_: any, args: { id: number; name?: string; color?: string; icon?: string; updated_by: string }) => {
      return await controller.update(args.id, args.name, args.color, args.icon, args.updated_by);
    },
    deleteUrgencyMaintenance: async (_: any, args: { id: number }) => {
      return await controller.delete(args.id);
    },
  },
};