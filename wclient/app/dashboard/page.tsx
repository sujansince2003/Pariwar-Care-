import Link from 'next/link';

const DashboardCard = ({ title, description, href }: {
  title: string;
  description: string;
  href: string;
}) => (
  <Link
    href={href}
    className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to Healthcare Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Nurse Dashboard"
          description="View assigned visits, submit vitals, and manage patient care activities."
          href="/dashboard/nurse"
        />
        <DashboardCard
          title="Medical Admin Dashboard"
          description="Review and approve reports, manage medical records, and oversee care quality."
          href="/dashboard/medical-admin"
        />
        <DashboardCard
          title="Admin Dashboard"
          description="Manage users, assign nurses, and view platform analytics."
          href="/dashboard/admin"
        />
      </div>
    </div>
  );
}