import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'CareLink — Child',
  description: 'Child workspace for CareLink'
}

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/child" className="text-lg font-semibold">
            CareLink
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/child/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/child/parents" className="text-sm text-gray-700 hover:text-blue-600">
              Parents
            </Link>
            <Link href="/child/book" className="text-sm text-gray-700 hover:text-blue-600">
              Book
            </Link>
            <Link href="/child/visits" className="text-sm text-gray-700 hover:text-blue-600">
              Visits
            </Link>
            <Link href="/signout" className="ml-4 text-sm text-red-600">
              Sign out
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} CareLink — Peace of mind for families
        </div>
      </footer>
    </div>
  )
}