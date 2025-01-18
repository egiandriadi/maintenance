// src/schema/typeDefs.ts

import { gql } from 'graphql-tag';

export const typeDefsUrgencyMaintenance = gql`
  type UrgencyMaintenance {
    id: Int!
    uuid: String!
    name: String!
    icon: String!
    color: String!
    created_by: String!
    created_at: String!
    updated_by: String
    updated_at: String
    deleted_by: String
    deleted_at: String
  }

  type Query {
    getUrgencyMaintenances: [UrgencyMaintenance!]!
    getUrgencyMaintenance(id: Int!): UrgencyMaintenance
  }

  type Mutation {
    createUrgencyMaintenance(name: String!, icon: String!, color: String!, created_by: String!): UrgencyMaintenance!
    updateUrgencyMaintenance(id: Int!, name: String, icon: String, color: String, updated_by: String): UrgencyMaintenance!
    deleteUrgencyMaintenance(id: Int!): UrgencyMaintenance!
  }
`;