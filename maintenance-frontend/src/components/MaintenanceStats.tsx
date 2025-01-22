import { useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import { GET_MAINTENANCE_STATS } from '../graphql/queries';
import styles from './MaintenanceStats.module.css';
import mqttService from '../lib/mqttClient';

interface MaintenanceStatsData {
  getMaintenanceStats: {
    averageResolutionTime: number;
    openRequests: number;
    urgentRequests: number;
  };
}

const MaintenanceStats: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<MaintenanceStatsData>(GET_MAINTENANCE_STATS);

  useEffect(() => {
    mqttService.onMessage((topic, message) => {
      console.log(`Received message on ${topic}: ${message.toString()}`);
      refetch();
    });
   
    return () => {
      
    };
    }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error: {error?.message}</p>;

  const { averageResolutionTime, openRequests, urgentRequests } = data.getMaintenanceStats;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statBox}>
        <h3>{openRequests}</h3>
        <p>Open Requests</p>
      </div>
      <div className={styles.statBox}>
        <h3>{urgentRequests}</h3>
        <p>Urgent Requests</p>
      </div>
      <div className={styles.statBox}>
        <h3>{averageResolutionTime}</h3>
        <p>Average time (days) to resolve</p>
      </div>
    </div>
  );
};

export default MaintenanceStats;