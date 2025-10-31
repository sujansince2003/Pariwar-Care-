// app/lab/clients/[id]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { sampleClients, Client } from "@/lib/mockData";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/statusBadge";

export default function ClientDetailPage() {
  const { id } = useParams();
  const client: Client | undefined = sampleClients.find(c => c.id === id);

  if (!client) return <div className="p-6">Client not found.</div>;

  return (
    <main className="min-h-screen bg-[#F5F6F8] p-6">
      <h1 className="text-2xl font-bold text-[#2E5C8A] mb-4">{client.name}</h1>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Test Type</p>
            <p className="font-semibold text-[#2E5C8A]">{client.testType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Age / Gender</p>
            <p className="font-semibold text-[#2E5C8A]">{client.age} / {client.gender}</p>
          </div>
          <StatusBadge status={client.status} />
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href={`/lab/clients/${id}/reportform`}
          className="px-4 py-2 rounded-md bg-[#5B9BD5] text-white hover:bg-[#4A8BC2] shadow-md transition"
        >
          Make Report
        </Link>
        <button className="px-4 py-2 rounded-md bg-white border border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#EDEFF2] shadow-sm transition">
          View Report
        </button>
      </div>
    </main>
  );
}
