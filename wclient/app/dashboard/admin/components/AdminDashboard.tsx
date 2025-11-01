"use client"

import { Analytics } from "./Analytics"
import { UserManagement } from "./UserManagement"
import { NurseAssignment } from "./NurseAssignment"

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Analytics Overview */}
      <Analytics />

      {/* User Management */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <UserManagement />
      </section>

      {/* Nurse Assignment */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Nurse Assignment</h2>
        <NurseAssignment />
      </section>
    </div>
  )
}
