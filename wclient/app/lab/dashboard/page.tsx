import React from 'react'
import Link from 'next/link'

type TestItem = {
  id: string
  patient: string
  testType: string
  scheduledFor: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REPORTED'
}

const sampleTests: TestItem[] = [
  { id: 't1', patient: 'Ram Thapa', testType: 'Blood Sugar', scheduledFor: '2025-11-02 09:30', status: 'PENDING' },
  { id: 't2', patient: 'Sita Sharma', testType: 'CBC', scheduledFor: '2025-11-02 10:00', status: 'IN_PROGRESS' },
  { id: 't3', patient: 'Maya KC', testType: 'Lipid Panel', scheduledFor: '2025-10-30 08:45', status: 'COMPLETED' },
  { id: 't4', patient: 'Hari Adhikari', testType: 'Urinalysis', scheduledFor: '2025-10-29 14:00', status: 'REPORTED' },
]

function StatusPill({ status }: { status: TestItem['status'] }) {
  const map: Record<TestItem['status'], string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-800',
    COMPLETED: 'bg-green-100 text-green-800',
    REPORTED: 'bg-blue-100 text-blue-800',
  }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{status.replace('_', ' ')}</span>
}

export default function LabDashboardPage() {
  const pending = sampleTests.filter((t) => t.status === 'PENDING').length
  const inProgress = sampleTests.filter((t) => t.status === 'IN_PROGRESS').length
  const completed = sampleTests.filter((t) => t.status === 'COMPLETED').length
  const reported = sampleTests.filter((t) => t.status === 'REPORTED').length

  return (
    <main className="container mx-auto p-6">
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Lab Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of today's tests, reports and quick actions.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/lab/tests/new" className="inline-flex items-center px-4 py-2 bg-white border rounded shadow-sm text-sm hover:bg-gray-50">
            + New Test
          </Link>
          <Link href="/lab/reports" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm text-sm hover:bg-blue-700">
            View Reports 
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded p-4 shadow-sm">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-semibold">{pending}</div>
        </div>

        <div className="bg-white border rounded p-4 shadow-sm">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-semibold">{inProgress}</div>
        </div>

        <div className="bg-white border rounded p-4 shadow-sm">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-semibold">{completed}</div>
        </div>

        <div className="bg-white border rounded p-4 shadow-sm">
          <div className="text-sm text-gray-500">Reports Ready</div>
          <div className="text-2xl font-semibold">{reported}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border rounded p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Today's Tests</h2>
            <Link href="/lab/tests" className="text-sm text-blue-600 hover:underline">View all</Link>
          </div>

          <ul className="space-y-3">
            {sampleTests.map((t) => (
              <li key={t.id} className="flex items-center justify-between p-3 rounded border">
                <div>
                  <div className="font-medium">{t.patient} — <span className="text-sm text-gray-500">{t.testType}</span></div>
                  <div className="text-xs text-gray-400">{t.scheduledFor}</div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusPill status={t.status} />
                  <Link href={`/lab/tests/${t.id}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="bg-white border rounded p-4 shadow-sm">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="flex flex-col gap-2">
            <Link href="/lab/tests/new" className="text-sm px-3 py-2 rounded border text-gray-700 hover:bg-gray-50">Register new sample</Link>
            <Link href="/lab/reports/new" className="text-sm px-3 py-2 rounded border text-gray-700 hover:bg-gray-50">Create report</Link>
            <Link href="/lab/patients" className="text-sm px-3 py-2 rounded border text-gray-700 hover:bg-gray-50">Patient records</Link>
            <Link href="/lab/settings" className="text-sm px-3 py-2 rounded border text-gray-700 hover:bg-gray-50">Lab settings</Link>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Notifications</h4>
            <div className="text-xs text-gray-500">No urgent alerts.</div>
          </div>
        </aside>
      </section>
    </main>
  )
}