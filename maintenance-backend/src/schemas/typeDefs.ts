// src/schema/typeDefs.ts

import { gql } from 'graphql-tag';
import { typeDefsStatusMaintenance } from './StatusMaintenance/typeDefs';
import { typeDefsUrgencyMaintenance } from './UrgencyMaintenance/typeDefs';
import { typeDefsMaintenanceRequest } from './MaintenanceRequest/typeDefs';

export const typeDefs = gql`
  ${typeDefsStatusMaintenance}
  ${typeDefsUrgencyMaintenance}
  ${typeDefsMaintenanceRequest}
`;