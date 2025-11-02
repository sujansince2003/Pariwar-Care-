import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared navigation/sidebar can go here */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden lg:block">
          <div className="h-full px-3 py-4">
                      <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/nurse"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Paramedic Dashboard
            </Link>
            <Link
              href="/dashboard/medical-admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Medical Admin
            </Link>
            <Link
              href="/dashboard/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Admin
            </Link>
          </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}