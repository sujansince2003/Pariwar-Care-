import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
};

const StatCard = ({ title, value, description, className = '' }: StatCardProps) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-semibold mb-1">{value}</p>
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
  );
}

export const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Pending Reviews"
        value={8}
        description="Awaiting your approval"
      />
      <StatCard
        title="Approved Today"
        value={12}
        description="Reports validated"
      />
      <StatCard
        title="Rejected Reports"
        value={2}
        description="Last 24 hours"
      />
      <StatCard
        title="Average Review Time"
        value="15 min"
        description="Per report"
      />
    </div>
  );
}