// src/schema/resolvers.ts

import { resolversStatusMaintenance } from './StatusMaintenance/resolvers';
import { resolversUrgencyMaintenance } from './UrgencyMaintenance/resolvers';
import { resolversMaintenanceRequest } from './MaintenanceRequest/resolvers';
import merge from 'lodash.merge';

export const resolvers = merge(
  resolversStatusMaintenance,
  resolversUrgencyMaintenance,
  resolversMaintenanceRequest
);