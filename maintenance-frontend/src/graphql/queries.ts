import { gql } from '@apollo/client';

export const GET_MAINTENANCE_REQUESTS = gql`
  query GetMaintenanceStats($page: Int, $pageSize: Int) {
    getMaintenanceRequests(page: $page, pageSize: $pageSize) {
      data {
        status_maintenance {
          name
          color
          id
          uuid
        }
        uuid
        title
        description
        urgency_maintenance {
          id
          icon
          color
          name
          uuid
        }
        id
        created_at
        created_by
      }
      page
      pageSize
      total
    }
  }
`;


export const GET_URGENCY_AND_STATUS = gql`
  query GetStatusMaintenances {
    getStatusMaintenances {
      color
      id
      name
    }
    getUrgencyMaintenances {
      icon
      color
      id
      name
    }
  }
`;

export const GET_MAINTENANCE_STATS = gql`
  query GetMaintenanceStats {
    getMaintenanceStats {
      averageResolutionTime
      openRequests
      urgentRequests
    }
  }
`;

export const CREATE_MAINTENANCE_REQUEST = gql`
  mutation CreateMaintenanceRequest(
    $title: String!
    $description: String!
    $statusMaintenanceId: Int!
    $urgencyMaintenanceId: Int!
    $createdBy: String!
  ) {
    createMaintenanceRequest(
      title: $title
      description: $description
      status_maintenance_id: $statusMaintenanceId
      urgency_maintenance_id: $urgencyMaintenanceId
      created_by: $createdBy
    ) {
      title
      description
      status_maintenance_id
      urgency_maintenance_id
      created_by
    }
  }
`;

export const UPDATE_STATUS_MAINTENANCE_REQUEST = gql`
  mutation UpdateStatusMaintenanceRequest($updateStatusMaintenanceRequestId: Int!, $statusMaintenanceId: Int!, $updatedBy: String) {
    updateStatusMaintenanceRequest(id: $updateStatusMaintenanceRequestId, status_maintenance_id: $statusMaintenanceId, updated_by: $updatedBy) {
      id
      status_maintenance_id
      updated_by
    }
  }
`;