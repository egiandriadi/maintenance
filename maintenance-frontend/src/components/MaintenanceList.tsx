import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MAINTENANCE_REQUESTS, UPDATE_STATUS_MAINTENANCE_REQUEST} from '../graphql/queries';
import styles from './MaintenanceList.module.css';
import mqttService from '../lib/mqttClient';

interface MaintenanceRequest {
  status_maintenance: {
    name: string;
    color: string;
    id: string;
    uuid: string;
  };
  uuid: string;
  title: string;
  description: string;
  urgency_maintenance: {
    id: string;
    icon: string;
    color: string;
    name: string;
    uuid: string;
  };
  id: string;
  created_at: string;
  created_by: string;
}

interface MaintenanceRequestsData {
  getMaintenanceRequests: {
    data: MaintenanceRequest[];
    page: number;
    pageSize: number;
    total: number;
  };
}

interface MaintenanceRequestsVars {
  page: number;
  pageSize: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(Number(dateString));
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const MaintenanceList: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [updateStatus] = useMutation(UPDATE_STATUS_MAINTENANCE_REQUEST);

  const { loading, error, data, refetch } = useQuery<MaintenanceRequestsData, MaintenanceRequestsVars>(
    GET_MAINTENANCE_REQUESTS,
    {
      variables: { page, pageSize },
    }
  );

  useEffect(() => {
    mqttService.onMessage((topic, message) => {
      console.log(`Received message on ${topic}: ${message.toString()}`);
      refetch();
    });
   
    return () => {
      
    };
  }, [refetch]);

  const handleStatusClick = async (id: number) => {
    try {
      await updateStatus({
        variables: {
          updateStatusMaintenanceRequestId: id,
          statusMaintenanceId: 3, // Set to resolved
          updatedBy: 'system', // Set updated_by to 'system'
        },
      });
      refetch(); // Refetch data after mutation
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const totalPages = data ? Math.ceil(data.getMaintenanceRequests.total / pageSize) : 1;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      refetch({ page: page + 1, pageSize });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      refetch({ page: page - 1, pageSize });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.listContainer}>
      {data?.getMaintenanceRequests.data.map((request) => (
        <div key={request.uuid} className={styles.requestItem}>
          <div className={styles.requestInfo}>
            <h4>{request.title}</h4>
            <p className={styles.urgency} style={{ color: request.urgency_maintenance.color }}>
              {request.urgency_maintenance.name}
            </p>
          </div>
          <div className={styles.requestMeta}>
            <p>{formatDate(request.created_at)}</p>
            <span 
              className={styles.status} 
              style={{ backgroundColor: request.status_maintenance.color }}
              onClick={() => handleStatusClick(Number(request.id))}
            >
              {request.status_maintenance.name}
            </span>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MaintenanceList;