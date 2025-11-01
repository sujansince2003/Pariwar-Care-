import { ReportList } from './ReportList';
import { AdminStats } from './AdminStats';

export default function MedicalAdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Medical Admin Dashboard</h1>
      
      {/* Quick Stats */}
      <AdminStats />
      
      {/* Report Review List */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Submitted Reports</h2>
        <ReportList />
      </section>
    </div>
  );
};