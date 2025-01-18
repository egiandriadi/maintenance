// src/schema/typeDefs.ts

import { gql } from 'graphql-tag';

export const typeDefsMaintenanceRequest = gql`
  type Subscription {
    maintenanceAdded: MaintenanceRequest
  }

  type MaintenanceRequestList {
    id: Int!
    uuid: String!
    title: String!
    description: String!
    status_maintenance: StatusMaintenance!
    urgency_maintenance: UrgencyMaintenance!
    created_by: String!
    created_at: String!
    updated_by: String
    updated_at: String
    deleted_by: String
    deleted_at: String
  }

  type MaintenanceRequest {
    id: Int!
    uuid: String!
    title: String!
    description: String!
    status_maintenance_id: Int!
    urgency_maintenance_id: Int!
    created_by: String!
    created_at: String!
    updated_by: String
    updated_at: String
    deleted_by: String
    deleted_at: String
  }

  type MaintenanceRequestPage {
    data: [MaintenanceRequestList!]!
    total: Int!
    page: Int!
    pageSize: Int!
  }

  type MaintenanceStats {
    openRequests: Int!
    urgentRequests: Int!
    averageResolutionTime: Float!
  }

  type Query {
    getMaintenanceStats: MaintenanceStats!
    getMaintenanceRequests(page: Int, pageSize: Int): MaintenanceRequestPage!
    getMaintenanceRequest(id: Int!): MaintenanceRequestList
  }

  type Mutation {
    createMaintenanceRequest(title: String!, description: String!, status_maintenance_id: Int!, urgency_maintenance_id: Int!, created_by: String!): MaintenanceRequest!
    updateMaintenanceRequest(id: Int!, title: String!, description: String!, status_maintenance_id: Int!, urgency_maintenance_id: Int!, updated_by: String): MaintenanceRequest!
    updateStatusMaintenanceRequest(id: Int!, status_maintenance_id: Int!, updated_by: String): MaintenanceRequest!
    deleteMaintenanceRequest(id: Int!): MaintenanceRequest!
  }
`;