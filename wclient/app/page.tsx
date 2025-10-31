// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-[#2E5C8A]">CareLink — Demo Frontend</h1>
        <p className="mt-3 text-gray-700">UI-only demo for Child dashboard, Visits and Reports. Data is mocked.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/auth/login" className="px-4 py-2 bg-[#5B9BD5] text-white rounded">Login (demo)</Link>
          <Link href="/child/dashboard" className="px-4 py-2 border border-gray-200 rounded">Open Child Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
