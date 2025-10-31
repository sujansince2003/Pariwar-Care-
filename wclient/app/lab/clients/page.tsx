"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2, Filter } from "lucide-react";

interface Client {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REPORTED";
  testType: string;
  image: string;
}

export default function ClientsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Dummy clients data
  const clients: Client[] = [
    {
      id: "1",
      name: "Ram Thapa",
      age: 32,
      gender: "Male",
      status: "PENDING",
      testType: "Blood Sugar",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "2",
      name: "Sita Sharma",
      age: 29,
      gender: "Female",
      status: "IN_PROGRESS",
      testType: "CBC",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "3",
      name: "Maya KC",
      age: 24,
      gender: "Female",
      status: "COMPLETED",
      testType: "Lipid Panel",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      id: "4",
      name: "Hari Adhikari",
      age: 40,
      gender: "Male",
      status: "REPORTED",
      testType: "Urinalysis",
      image: "https://randomuser.me/api/portraits/men/18.jpg",
    },
    {
      id: "5",
      name: "Kiran Rana",
      age: 27,
      gender: "Male",
      status: "PENDING",
      testType: "Liver Function Test",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: "6",
      name: "Bimala Karki",
      age: 35,
      gender: "Female",
      status: "IN_PROGRESS",
      testType: "Thyroid Panel",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  const filteredClients = filter
    ? clients.filter((c) => c.status === filter)
    : clients;

  const toggleFilter = () => {
    if (filter === null) setFilter("PENDING");
    else setFilter(null);
  };

  return (
    <main className="min-h-screen bg-[#F5F7FB] p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Clients</h1>
          <p className="text-gray-500 text-sm">
            View and manage all patients and their reports.
          </p>
        </div>

        {/* Filter Button */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={toggleFilter}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 transition ${
              filter
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            <Filter size={16} />
            {filter ? "Clear Filter" : "Filter Pending"}
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-600 hover:shadow-md transition p-5 flex items-center gap-4"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.testType}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        client.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : client.status === "IN_PROGRESS"
                          ? "bg-indigo-100 text-indigo-800"
                          : client.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No clients found.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
