"use client"

import React, { useState } from 'react';

type Nurse = {
  id: string;
  name: string;
  email: string;
  region: string;
  activeVisits: number;
  status: 'Available' | 'On Visit' | 'Off Duty';
};

type Visit = {
  id: string;
  patientName: string;
  date: string;
  time: string;
  region: string;
  status: 'Unassigned' | 'Assigned' | 'Completed';
  assignedNurse?: string;
};

const mockNurses: Nurse[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    region: 'North',
    activeVisits: 2,
    status: 'Available'
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    region: 'South',
    activeVisits: 3,
    status: 'On Visit'
  }
];

const mockVisits: Visit[] = [
  {
    id: '1',
    patientName: 'John Doe',
    date: '2025-11-03',
    time: '10:00 AM',
    region: 'North',
    status: 'Unassigned'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    date: '2025-11-03',
    time: '2:30 PM',
    region: 'South',
    status: 'Unassigned'
  }
];

export const NurseAssignment = () => {
  const [visits, setVisits] = useState(mockVisits);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  
  const filteredVisits = visits.filter(visit => 
    selectedRegion === 'All' || visit.region === selectedRegion
  );

  const handleAssignNurse = (visitId: string, nurseId: string) => {
    setVisits(visits.map(visit => 
      visit.id === visitId
        ? { ...visit, status: 'Assigned' as const, assignedNurse: nurseId }
        : visit
    ));
  };

  const handleAutoAssign = () => {
    // Simple auto-assignment logic (could be made more sophisticated)
    const availableNurses = mockNurses.filter(n => n.status === 'Available');
    
    setVisits(visits.map(visit => {
      if (visit.status !== 'Unassigned') return visit;
      
      const matchingNurse = availableNurses.find(n => n.region === visit.region);
      if (!matchingNurse) return visit;

      return {
        ...visit,
        status: 'Assigned' as const,
        assignedNurse: matchingNurse.id
      };
    }));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="All">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <button
          onClick={handleAutoAssign}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Auto-Assign Available Nurses
        </button>
      </div>

      {/* Nurses Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Available Nurses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockNurses.map(nurse => (
            <div key={nurse.id} className="p-4 border rounded-lg">
              <h4 className="font-medium">{nurse.name}</h4>
              <p className="text-sm text-gray-600">{nurse.email}</p>
              <p className="text-sm text-gray-600">Region: {nurse.region}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  nurse.status === 'Available' ? 'bg-green-100 text-green-800' :
                  nurse.status === 'On Visit' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {nurse.status}
                </span>
                <span className="text-sm text-gray-600">
                  {nurse.activeVisits} active visits
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visits List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold p-4 border-b">Upcoming Visits</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Patient</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date & Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Region</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Assign Nurse</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{visit.patientName}</td>
                  <td className="px-4 py-3">
                    {visit.date} at {visit.time}
                  </td>
                  <td className="px-4 py-3">{visit.region}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      visit.status === 'Unassigned' ? 'bg-yellow-100 text-yellow-800' :
                      visit.status === 'Assigned' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {visit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {visit.status === 'Unassigned' && (
                      <select
                        onChange={(e) => handleAssignNurse(visit.id, e.target.value)}
                        className="px-2 py-1 border rounded-md text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>Select nurse</option>
                        {mockNurses
                          .filter(n => n.status === 'Available' && n.region === visit.region)
                          .map(nurse => (
                            <option key={nurse.id} value={nurse.id}>
                              {nurse.name}
                            </option>
                          ))
                        }
                      </select>
                    )}
                    {visit.status === 'Assigned' && (
                      <span className="text-sm text-gray-600">
                        {mockNurses.find(n => n.id === visit.assignedNurse)?.name}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}