import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

function StatCard({ title, value, trend, className = '' }: StatCardProps) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-semibold mb-1">{value}</p>
      {trend && (
        <p className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last month
        </p>
      )}
    </div>
  );
}

type ChartData = {
  label: string;
  value: number;
};

function BarChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex items-end h-40 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-blue-500 rounded-t"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
          <span className="text-xs mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export const Analytics = () => {
  const visitTrend: ChartData[] = [
    { label: 'Jun', value: 120 },
    { label: 'Jul', value: 150 },
    { label: 'Aug', value: 180 },
    { label: 'Sep', value: 210 },
    { label: 'Oct', value: 240 },
    { label: 'Nov', value: 270 }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="1,234"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Nurses"
          value="45"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Monthly Visits"
          value="892"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Approvals"
          value="23"
          trend={{ value: 3, isPositive: false }}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Monthly Visit Trends</h3>
        <BarChart data={visitTrend} />
      </div>
    </div>
  );
}