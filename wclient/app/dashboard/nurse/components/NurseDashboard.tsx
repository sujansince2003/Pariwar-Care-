import { NurseVisitList } from './NurseVisitList';
import { NurseStats } from './NurseStats';

export default function NurseDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nurse Dashboard</h1>
      
      {/* Quick Stats */}
      <NurseStats />
      
      {/* Visit List */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Assigned Visits</h2>
        <NurseVisitList />
      </section>
    </div>
  );
};