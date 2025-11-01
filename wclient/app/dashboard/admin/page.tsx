import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = dynamic(() => import('./components/AdminDashboard'), {
  loading: () => <LoadingSpinner />
});

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}