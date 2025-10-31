import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'CareLink — Laboratory',
  description: 'Laboratory workspace for CareLink'
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/lab" className="text-lg font-semibold text-blue-700">
            CareLink Lab
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/lab/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/lab/tests" className="text-sm text-gray-700 hover:text-blue-600">
              Tests
            </Link>
            <Link href="/lab/reports" className="text-sm text-gray-700 hover:text-blue-600">
              Reports
            </Link>
            <Link href="/lab/patients" className="text-sm text-gray-700 hover:text-blue-600">
              Patients
            </Link>
            <div className="h-4 w-px bg-gray-200 mx-2" />
            <button className="text-sm text-gray-600 hover:text-blue-600">
              Dr. Sarah (Lab Tech)
            </button>
            <Link href="/signout" className="text-sm text-red-600 hover:text-red-700">
              Sign out
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t bg-white mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} CareLink Laboratory Services
            </span>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/lab/help" className="hover:text-blue-600">Help</Link>
              <Link href="/lab/contact" className="hover:text-blue-600">Contact</Link>
              <Link href="/lab/privacy" className="hover:text-blue-600">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}