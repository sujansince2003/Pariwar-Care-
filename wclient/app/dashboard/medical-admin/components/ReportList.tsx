"use client"

import React, { useState } from "react"

type Report = {
  id: string
  patientName: string
  nurseName: string
  visitDate: string
  submittedAt: string
  status: "Pending Review" | "Approved" | "Rejected"
  vitals: {
    temperature: string
    bloodPressure: string
    pulseRate: string
    oxygenLevel: string
    weight: string
  }
  notes: string
}

const mockReports: Report[] = [
  {
    id: "1",
    patientName: "John Doe",
    nurseName: "Sarah Wilson",
    visitDate: "2025-11-02",
    submittedAt: "2025-11-02 11:30 AM",
    status: "Pending Review",
    vitals: {
      temperature: "98.6°F",
      bloodPressure: "120/80",
      pulseRate: "72",
      oxygenLevel: "98%",
      weight: "70kg",
    },
    notes: "Patient reported mild headache. All vitals normal.",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    nurseName: "Michael Brown",
    visitDate: "2025-11-02",
    submittedAt: "2025-11-02 2:45 PM",
    status: "Pending Review",
    vitals: {
      temperature: "98.8°F",
      bloodPressure: "118/75",
      pulseRate: "68",
      oxygenLevel: "99%",
      weight: "65kg",
    },
    notes: "Follow-up visit. Recovery progressing well.",
  },
]

export const ReportList = () => {
  const [reports, setReports] = useState(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectModal, setShowRejectModal] = useState(false)

  const handleApprove = (reportId: string) => {
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, status: "Approved" as const }
          : report
      )
    )
  }

  const handleReject = (reportId: string) => {
    setSelectedReport(reports.find((r) => r.id === reportId) || null)
    setShowRejectModal(true)
  }

  const submitRejection = () => {
    if (!selectedReport) return

    setReports(
      reports.map((report) =>
        report.id === selectedReport.id
          ? { ...report, status: "Rejected" as const }
          : report
      )
    )
    setShowRejectModal(false)
    setRejectReason("")
    setSelectedReport(null)
  }

  return (
    <>
      <div className="grid gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{report.patientName}</h3>
                <p className="text-gray-600">Nurse: {report.nurseName}</p>
                <p className="text-gray-600">Visit Date: {report.visitDate}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  report.status === "Pending Review"
                    ? "bg-yellow-100 text-yellow-800"
                    : report.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {report.status}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Vitals</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p>Temperature: {report.vitals.temperature}</p>
                <p>BP: {report.vitals.bloodPressure}</p>
                <p>Pulse: {report.vitals.pulseRate}</p>
                <p>O2: {report.vitals.oxygenLevel}</p>
                <p>Weight: {report.vitals.weight}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-gray-700">{report.notes}</p>
            </div>

            {report.status === "Pending Review" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(report.id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(report.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Reject Report</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full p-2 border rounded-md mb-4 min-h-[100px]"
            />
            <div className="flex gap-3">
              <button
                onClick={submitRejection}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason("")
                  setSelectedReport(null)
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
