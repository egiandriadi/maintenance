import { useRouter } from 'next/router';
import MaintenanceStats from '../components/MaintenanceStats';
import MaintenanceList from '../components/MaintenanceList';

const Home: React.FC = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/add');
  };

  return (
    <div className="container">
      <h1>Maintenance Request</h1>
      <MaintenanceStats />
      <MaintenanceList />
      <button className="addButton" onClick={handleAddClick}>
        <span className="plusIcon">+</span>
      </button>
    </div>
  );
};

export default Home;