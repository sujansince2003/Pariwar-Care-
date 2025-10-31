"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy analytics data
const reportStats = [
  { week: "Week 1", reports: 14 },
  { week: "Week 2", reports: 22 },
  { week: "Week 3", reports: 19 },
  { week: "Week 4", reports: 25 },
];

const testTypeData = [
  { name: "Blood Test", value: 40 },
  { name: "Urine Test", value: 25 },
  { name: "X-Ray", value: 20 },
  { name: "MRI", value: 15 },
];

const COLORS = ["#5B9BD5", "#89CFF0", "#9BD673", "#FFD966"];

const sampleReports = [
  { id: "r1", patient: "Ram Thapa", testType: "Blood Test", date: "2025-10-30", status: "COMPLETED" },
  { id: "r2", patient: "Sita Sharma", testType: "Urine Test", date: "2025-10-31", status: "PENDING" },
  { id: "r3", patient: "Maya KC", testType: "X-Ray", date: "2025-10-29", status: "COMPLETED" },
  { id: "r4", patient: "Hari Adhikari", testType: "MRI", date: "2025-10-28", status: "VERIFIED" },
];

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    VERIFIED: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${colorMap[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] px-6 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Lab Reports</h1>
          <p className="text-gray-500 mt-1 text-sm">
            View and analyze all patient reports efficiently.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <Link
            href="/lab/reports/new"
            className="px-4 py-2 rounded-md bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
          >
            + New Report
          </Link>
          <button className="px-4 py-2 rounded-md bg-white border border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#EDEFF2] transition">
            Export Data
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: "Total Reports", value: 120 },
          { label: "Completed", value: 85 },
          { label: "Pending Verification", value: 25 },
          { label: "This Month", value: 35 },
        ].map((card) => (
          <div
            key={card.label}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-semibold text-[#2E5C8A]">{card.value}</p>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2E5C8A] mb-4">Reports per Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportStats}>
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="reports" fill="#5B9BD5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2E5C8A] mb-4">Report Types Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={testTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {testTypeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Reports Table */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2E5C8A] mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-100 text-sm">
            <thead>
              <tr className="bg-[#EDEFF2] text-gray-700">
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Test Type</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleReports.map((r) => (
                <tr key={r.id} className="border-t hover:bg-[#F5F6F8] transition">
                  <td className="py-3 px-4">{r.patient}</td>
                  <td className="py-3 px-4">{r.testType}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/lab/reports/${r.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-xs text-gray-400 mt-8 text-center">
        ⏱ Data auto-refreshed every 5 mins (demo)
      </footer>
    </main>
  );
}
 