import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'CareLink — Child',
  description: 'Child workspace for CareLink'
}

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
    
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}