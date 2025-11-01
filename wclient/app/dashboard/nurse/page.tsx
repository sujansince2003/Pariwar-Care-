import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/LoadingSpinner';

const NurseDashboard = dynamic(() => import('./components/NurseDashboard'), {
  loading: () => <LoadingSpinner />
});

export default function NurseDashboardPage() {
  return <NurseDashboard />;
}