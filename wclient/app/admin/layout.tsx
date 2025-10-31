import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'CareLink — Admin',
  description: 'Admin workspace for CareLink'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Theme colors (from your prompt)
  const PRIMARY_BLUE = '#5B9BD5'
  const DARK_BLUE = '#2E5C8A'
  const SECONDARY_BG = '#F5F6F8'
  const SURFACE = '#EDEFF2'
  const WHITE = '#FFFFFF'

  return (
    <div className="min-h-screen" style={{ backgroundColor: SECONDARY_BG, color: DARK_BLUE }}>
      {/* Top header */}
      <header style={{ backgroundColor: WHITE, borderBottom: `1px solid ${SURFACE}` }} className="sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div
                className="rounded-md flex items-center justify-center font-semibold text-white"
                style={{ backgroundColor: PRIMARY_BLUE, width: 44, height: 44 }}
              >
                CL
              </div>
              <div>
                <div style={{ color: DARK_BLUE }} className="text-lg font-semibold">CareLink Admin</div>
                <div className="text-xs text-gray-500">Platform management</div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link href="/admin/nurses" className="px-3 py-2 rounded hover:bg-gray-100">Nurses</Link>
            <Link href="/admin/visits" className="px-3 py-2 rounded hover:bg-gray-100">Visits</Link>
            <Link href="/admin/reports" className="px-3 py-2 rounded hover:bg-gray-100">Reports</Link>
            <Link href="/admin/settings" className="px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <div className="px-3 py-2 text-sm rounded text-red-600 hover:bg-gray-100">
              Sign out
            </div>
          </nav>
        </div>
      </header>

      {/* Main layout: sidebar + content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 rounded" style={{ backgroundColor: SURFACE }}>
              <div className="p-4 border-b" style={{ borderColor: WHITE }}>
                <div className="text-sm font-medium" style={{ color: DARK_BLUE }}>Admin Menu</div>
                <div className="text-xs text-gray-500 mt-1">Manage staff and appointments</div>
              </div>

              <nav className="p-3 space-y-1">
                <Link href="/admin/dashboard" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Dashboard
                </Link>
                <Link href="/admin/nurses" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Nurses
                </Link>
                <Link href="/admin/assign" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Assign Visits
                </Link>
                <Link href="/admin/appointments" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Appointments
                </Link>
                <Link href="/admin/reports" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Reports
                </Link>
                <Link href="/admin/settings" className="block px-3 py-2 rounded text-sm hover:bg-white" style={{ color: DARK_BLUE }}>
                  Settings
                </Link>
              </nav>

              <div className="p-3 border-t text-xs text-gray-600" style={{ borderColor: WHITE }}>
                <div className="mb-2">Quick actions</div>
                <div className="flex flex-col gap-2">
                  <Link href="/admin/nurses/new" className="text-sm px-3 py-2 rounded" style={{ backgroundColor: PRIMARY_BLUE, color: WHITE, textAlign: 'center' }}>
                    + Add Nurse
                  </Link>
                  <Link href="/admin/visits/new" className="text-sm px-3 py-2 rounded border text-center">
                    Create Visit
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="md:col-span-5">
            <div className="rounded" style={{ backgroundColor: WHITE, boxShadow: '0 0 0 1px rgba(0,0,0,0.02)' }}>
              {children}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t" style={{ borderColor: SURFACE, backgroundColor: WHITE }}>
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span>© {new Date().getFullYear()} CareLink — Admin</span>
            <div className="flex gap-4">
              <Link href="/admin/help" className="hover:text-blue-600">Help</Link>
              <Link href="/admin/privacy" className="hover:text-blue-600">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}