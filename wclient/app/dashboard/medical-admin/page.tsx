import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/LoadingSpinner';

const MedicalAdminDashboard = dynamic(() => import('./components/MedicalAdminDashboard'), {
  loading: () => <LoadingSpinner />
});

export default function MedicalAdminDashboardPage() {
  return <MedicalAdminDashboard />;
}