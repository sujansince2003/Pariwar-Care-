'use client'

import React from 'react'
import Link from 'next/link'

type Parent = {
  id: string
  name: string
  age: number
  conditions?: string
  lastVisit?: string
}

type Visit = {
  id: string
  parentName: string
  scheduledFor: string
  status: 'PENDING' | 'ASSIGNED' | 'STARTED' | 'COMPLETED'
}

const sampleParents: Parent[] = [
  { id: 'p1', name: 'Sita Sharma', age: 72, conditions: 'Hypertension', lastVisit: '2025-10-10' },
  { id: 'p2', name: 'Ram Thapa', age: 68, conditions: 'Diabetes', lastVisit: '2025-09-22' },
  { id: 'p3', name: 'Maya KC', age: 80, conditions: 'Arthritis', lastVisit: '2025-08-05' },
]

const sampleVisits: Visit[] = [
  { id: 'v1', parentName: 'Sita Sharma', scheduledFor: '2025-11-02 10:00', status: 'ASSIGNED' },
  { id: 'v2', parentName: 'Ram Thapa', scheduledFor: '2025-11-05 14:00', status: 'PENDING' },
  { id: 'v3', parentName: 'Maya KC', scheduledFor: '2025-10-30 09:00', status: 'COMPLETED' },
]

function StatusBadge({ status }: { status: Visit['status'] }) {
  const colors: Record<Visit['status'], string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    ASSIGNED: 'bg-blue-100 text-blue-800',
    STARTED: 'bg-indigo-100 text-indigo-800',
    COMPLETED: 'bg-green-100 text-green-800',
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${colors[status]}`}>
      {status}
    </span>
  )
}

export default function ChildDashboard() {
  return (
    <main className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard — Parents & Visits</h1>
          <p className="text-sm text-gray-500">Overview of your parents' upcoming visits and recent reports.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/child/parents/new" className="inline-flex items-center px-4 py-2 bg-white border rounded shadow-sm text-sm hover:bg-gray-50">
            + Add Parent
          </Link>
          <Link href="/child/book" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm text-sm hover:bg-blue-700">
            Book Visit
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Parents list */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Your Parents</h2>
            <p className="text-sm text-gray-500">{sampleParents.length} profiles</p>
          </div>

          <ul className="space-y-3">
            {sampleParents.map((p) => (
              <li key={p.id} className="bg-white border rounded p-4 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="text-sm text-gray-500">• {p.age} yrs</span>
                  </div>
                  <p className="text-sm text-gray-600">{p.conditions}</p>
                  <p className="text-xs text-gray-400 mt-1">Last visit: {p.lastVisit ?? '—'}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Link href={`/child/parents/${p.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
                  <Link href={`/child/book?parent=${p.id}`} className="text-sm text-gray-600 hover:underline">Book visit</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: upcoming visits + quick metrics */}
        <aside className="space-y-4">
          <div className="bg-white border rounded p-4 shadow-sm">
            <h3 className="font-medium mb-3">Upcoming Visits</h3>
            <ul className="space-y-2">
              {sampleVisits.map((v) => (
                <li key={v.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{v.parentName}</div>
                    <div className="text-xs text-gray-500">{v.scheduledFor}</div>
                  </div>
                  <StatusBadge status={v.status} />
                </li>
              ))}
            </ul>
            <Link href="/child/visits" className="block mt-3 text-sm text-blue-600 hover:underline">View all visits</Link>
          </div>

          <div className="bg-white border rounded p-4 shadow-sm">
            <h3 className="font-medium mb-3">Recent Report</h3>
            <div className="text-sm text-gray-600">No new reports — you will be notified when your parent's nurse completes a visit.</div>
          </div>

          <div className="bg-white border rounded p-4 shadow-sm">
            <h3 className="font-medium mb-3">Vitals Trend (preview)</h3>
            <div className="h-28 bg-gray-50 rounded flex items-center justify-center text-xs text-gray-400">
              Chart placeholder — integrate chart library (Recharts / Chart.js) later
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}