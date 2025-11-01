"use client"

import React from "react"

type Visit = {
  id: string
  patientName: string
  date: string
  time: string
  address: string
  visitType: "Check-up" | "Diagnostic" | "Follow-up"
  status: "Pending" | "In Progress" | "Completed"
}

const mockVisits: Visit[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2025-11-02",
    time: "10:00 AM",
    address: "123 Healthcare St, Medical City",
    visitType: "Check-up",
    status: "Pending",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2025-11-02",
    time: "2:30 PM",
    address: "456 Wellness Ave, Care Town",
    visitType: "Follow-up",
    status: "Pending",
  },
]

export function NurseVisitList() {
  const handleStartVisit = (visitId: string) => {
    // TODO: Implement visit start logic
    console.log("Starting visit:", visitId)
  }

  return (
    <div className="grid gap-4">
      {mockVisits.map((visit) => (
        <div
          key={visit.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{visit.patientName}</h3>
              <p className="text-gray-600">
                {visit.date} at {visit.time}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                visit.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : visit.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {visit.status}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-medium">Address:</span> {visit.address}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Visit Type:</span> {visit.visitType}
            </p>
          </div>

          {visit.status === "Pending" && (
            <button
              onClick={() => handleStartVisit(visit.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Visit
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
