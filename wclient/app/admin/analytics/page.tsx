'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'

type DayPoint = { day: string; value: number }
type StatusCounts = Record<'PENDING' | 'ASSIGNED' | 'STARTED' | 'COMPLETED', number>

const visitsPerDay: DayPoint[] = [
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 12 },
  { day: 'Wed', value: 9 },
  { day: 'Thu', value: 14 },
  { day: 'Fri', value: 11 },
  { day: 'Sat', value: 6 },
  { day: 'Sun', value: 4 },
]

const statusCounts: StatusCounts = {
  PENDING: 5,
  ASSIGNED: 7,
  STARTED: 3,
  COMPLETED: 24,
}

const vitalsTrend = {
  dates: ['2025-10-24', '2025-10-25', '2025-10-26', '2025-10-27', '2025-10-28', '2025-10-29', '2025-10-30'],
  bpSystolic: [132, 128, 130, 126, 134, 129, 127],
  sugar: [110, 115, 108, 122, 118, 112, 109],
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border rounded p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  )
}

/* Simple SVG Line Chart */
function LineChart({ points, color = '#5B9BD5', height = 120 }: { points: number[]; color?: string; height?: number }) {
  const width = 360
  const padding = 16
  const max = Math.max(...points) || 1
  const min = Math.min(...points)
  const range = max - min || 1

  const path = points
    .map((v, i) => {
      const x = padding + (i / (points.length - 1 || 1)) * (width - padding * 2)
      const y = padding + ((max - v) / range) * (height - padding * 2)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const area = points.length > 1 ? `${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z` : ''

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="rounded">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.14" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {area && <path d={area} fill="url(#grad)" stroke="none" />}

      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {/* points */}
      {points.map((v, i) => {
        const x = padding + (i / (points.length - 1 || 1)) * (width - padding * 2)
        const y = padding + ((max - v) / range) * (height - padding * 2)
        return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />
      })}
    </svg>
  )
}

/* Simple Bar Chart */
function BarChart({ data, labels, color = '#2E5C8A' }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data) || 1
  return (
    <div className="flex items-end gap-3 h-36">
      {data.map((v, i) => {
        const h = (v / max) * 100
        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex-1 flex items-end">
              <div
                title={`${labels[i]}: ${v}`}
                className="rounded-t"
                style={{ height: `${h}%`, background: color, width: '100%' }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{labels[i]}</div>
          </div>
        )
      })}
    </div>
  )
}

/* Simple Donut Chart (SVG) */
function DonutChart({ counts }: { counts: StatusCounts }) {
  const entries = Object.entries(counts)
  const total = entries.reduce((s, [, v]) => s + v, 0) || 1
  const radius = 36
  const circumference = 2 * Math.PI * radius
  let offset = 0

  const colorMap: Record<string, string> = {
    PENDING: '#F59E0B', // yellow
    ASSIGNED: '#5B9BD5', // primary blue
    STARTED: '#6366F1', // indigo
    COMPLETED: '#10B981', // green
  }

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <g transform="translate(60,60)">
        {entries.map(([k, v], i) => {
          const portion = v / total
          const dash = portion * circumference
          const strokeDasharray = `${dash} ${circumference - dash}`
          const result = (
            <circle
              key={k}
              r={radius}
              fill="transparent"
              stroke={colorMap[k] ?? '#CBD5E1'}
              strokeWidth={14}
              strokeLinecap="butt"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-offset}
              transform="rotate(-90)"
            />
          )
          offset += dash
          return result
        })}
        <circle r={radius - 10} fill="#fff" />
        <text x="0" y="4" textAnchor="middle" className="text-xs font-medium" style={{ fill: '#374151' }}>
          {total}
        </text>
        <text x="0" y="18" textAnchor="middle" className="text-[10px]" style={{ fill: '#9CA3AF' }}>
          total
        </text>
      </g>
    </svg>
  )
}

export default function AdminAnalyticsPage() {
  const visitCounts = useMemo(() => visitsPerDay.map((d) => d.value), [])
  const visitLabels = useMemo(() => visitsPerDay.map((d) => d.day), [])

  const bpPoints = vitalsTrend.bpSystolic
  const sugarPoints = vitalsTrend.sugar

  return (
    <main className="container mx-auto p-6">
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: '#2E5C8A' }}>
            Admin Analytics
          </h1>
          <p className="text-sm text-gray-500">Quick operational and clinical metrics for the platform.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/analytics/export" className="inline-flex items-center px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50">
            Export CSV
          </Link>
          <Link href="/admin/reports" className="inline-flex items-center px-3 py-2 bg-[#5B9BD5] text-white rounded text-sm hover:opacity-95">
            Go to Reports
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Visit Volume (last 7 days)">
          <div className="w-full">
            <BarChart data={visitCounts} labels={visitLabels} color="#2E5C8A" />
          </div>
        </Card>

        <Card title="Visit Status Distribution">
          <div className="flex items-center gap-4">
            <DonutChart counts={statusCounts} />
            <div className="flex-1">
              <ul className="space-y-2 text-sm">
                {Object.entries(statusCounts).map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded"
                        style={{
                          background:
                            k === 'PENDING' ? '#F59E0B' : k === 'ASSIGNED' ? '#5B9BD5' : k === 'STARTED' ? '#6366F1' : '#10B981',
                        }}
                      />
                      <span className="text-sm text-gray-700">{k.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{v}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Vitals Trend (sample)">
          <div className="space-y-3">
            <div className="text-xs text-gray-500">Systolic BP (last 7 days)</div>
            <div className="w-full">
              <LineChart points={bpPoints} color="#5B9BD5" />
            </div>

            <div className="text-xs text-gray-500 mt-2">Blood Sugar (mg/dL)</div>
            <div className="w-full">
              <LineChart points={sugarPoints} color="#10B981" />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Alerts / Issues">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <div className="text-yellow-600 font-medium">●</div>
              <div>
                <div className="font-medium text-gray-700">High overdue visits</div>
                <div className="text-xs text-gray-500">12 visits overdue for assignment or completion</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="text-red-600 font-medium">●</div>
              <div>
                <div className="font-medium text-gray-700">Samples pending processing</div>
                <div className="text-xs text-gray-500">8 samples waiting in queue 24h</div>
              </div>
            </li>
          </ul>
        </Card>

        <Card title="Operational Summary">
          <div className="text-sm text-gray-600 space-y-2">
            <div>Daily average visits: <strong className="text-gray-800">{Math.round(visitCounts.reduce((s, v) => s + v, 0) / visitCounts.length)}</strong></div>
            <div>Completed visits this week: <strong className="text-gray-800">{statusCounts.COMPLETED}</strong></div>
            <div>Active nurses: <strong className="text-gray-800">18</strong></div>
            <div>New patients (7d): <strong className="text-gray-800">5</strong></div>
          </div>
        </Card>
      </section>
    </main>
  )
}