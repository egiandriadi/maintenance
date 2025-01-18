// src/schema/typeDefs.ts
import { gql } from 'graphql-tag';

export const typeDefsStatusMaintenance = gql`
  type StatusMaintenance {
    id: Int!
    uuid: String!
    name: String!
    color: String!
    created_by: String!
    created_at: String!
    updated_by: String
    updated_at: String
    deleted_by: String
    deleted_at: String
  }

  type Query {
    getStatusMaintenances: [StatusMaintenance!]!
    getStatusMaintenance(id: Int!): StatusMaintenance
  }

  type Mutation {
    createStatusMaintenance(name: String!, color: String!, created_by: String!): StatusMaintenance!
    updateStatusMaintenance(id: Int!, name: String, color: String, updated_by: String): StatusMaintenance!
    deleteStatusMaintenance(id: Int!): StatusMaintenance!
  }
`;