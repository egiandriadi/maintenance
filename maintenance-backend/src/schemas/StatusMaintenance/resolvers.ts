// src/schema/resolvers.ts

import { StatusMaintenanceController } from '../../controllers/StatusMaintenanceController';

const controller = new StatusMaintenanceController();

export const resolversStatusMaintenance = {
  Query: {
    getStatusMaintenances: async () => {
      return await controller.getAll();
    },
    getStatusMaintenance: async (_: any, args: { id: number }) => {
      return await controller.getById(args.id);
    },
  },
  Mutation: {
    createStatusMaintenance: async (_: any, args: { name: string; color: string; created_by: string }) => {
      return await controller.create(args.name, args.color, args.created_by);
    },
    updateStatusMaintenance: async (_: any, args: { id: number; name?: string; color?: string; updated_by: string }) => {
      return await controller.update(args.id, args.name, args.color, args.updated_by);
    },
    deleteStatusMaintenance: async (_: any, args: { id: number }) => {
      return await controller.delete(args.id);
    },
  },
};