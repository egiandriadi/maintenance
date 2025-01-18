// src/schema/resolvers.ts

import { MaintenanceRequestController } from '../../controllers/MaintenanceRequestController';
import { PubSub } from 'graphql-subscriptions';

const controller = new MaintenanceRequestController();

type PubSubEvents = {
  MAINTENANCE_ADDED: any;
};
const pubsub = new PubSub<PubSubEvents>();

export const resolversMaintenanceRequest = {
  Subscription: {
    maintenanceAdded: {
      subscribe: () => {
        console.log('Subscription to maintenanceAdded triggered');
        return (pubsub as any).asyncIterator('MAINTENANCE_ADDED');
      },
    },
  },
  Query: {  
    getMaintenanceStats: async () => {
      return await controller.getMaintenanceStats();
    },
    getMaintenanceRequests: async (_: any, args: { page?: number; pageSize?: number }) => {
      const page = args.page || 1;
      const pageSize = args.pageSize || 10; // Default page size

      return await controller.getAll(page, pageSize);
    },
    getMaintenanceRequest: async (_: any, args: { id: number }) => {
      return await controller.getById(args.id);
    },
  },
  Mutation: {
    createMaintenanceRequest: async (_: any, args: { title: string; description: string; status_maintenance_id: number; urgency_maintenance_id: number; created_by: string }) => {
      return await controller.create(args.title, args.description, args.status_maintenance_id, args.urgency_maintenance_id, args.created_by);
    },
    updateMaintenanceRequest: async (_: any, args: { id: number; title?: string; description?: string; status_maintenance_id?: number; urgency_maintenance_id?: number; updated_by: string }) => {
      return await controller.update(args.id, args.title, args.description, args.status_maintenance_id, args.urgency_maintenance_id, args.updated_by);
    },
    updateStatusMaintenanceRequest: async (_: any, args: { id: number; status_maintenance_id?: number; updated_by: string }) => {
      return await controller.updateStatus(args.id, args.status_maintenance_id, args.updated_by);
    },
    deleteMaintenanceRequest: async (_: any, args: { id: number }) => {
      return await controller.delete(args.id);
    },
  },
};