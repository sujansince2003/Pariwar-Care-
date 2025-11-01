"use client"

import React, { useState } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "Patient" | "Nurse" | "Medical Admin" | "Child" | "Admin"
  status: "Active" | "Suspended"
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient",
    status: "Active",
    lastActive: "2025-11-02 10:30 AM",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Nurse",
    status: "Active",
    lastActive: "2025-11-02 11:45 AM",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    role: "Medical Admin",
    status: "Active",
    lastActive: "2025-11-02 09:15 AM",
  },
]

export const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers)
  const [selectedRole, setSelectedRole] = useState<User["role"] | "All">("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRole && matchesSearch
  })

  const handleStatusToggle = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? ("Suspended" as const)
                  : ("Active" as const),
            }
          : user
      )
    )
  }

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border rounded-md"
        />
        <select
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value as User["role"] | "All")
          }
          className="px-3 py-2 border rounded-md"
        >
          <option value="All">All Roles</option>
          <option value="Patient">Patient</option>
          <option value="Nurse">Nurse</option>
          <option value="Medical Admin">Medical Admin</option>
          <option value="Child">Child</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Last Active
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as User["role"])
                    }
                    className="px-2 py-1 border rounded-md text-sm"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Medical Admin">Medical Admin</option>
                    <option value="Child">Child</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.lastActive}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleStatusToggle(user.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      user.status === "Active"
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {user.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
