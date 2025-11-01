"use client"

import React from "react"
import { theme } from "@/app/styles/theme"

type StatCardProps = {
  title: string
  value: string | number
  description?: string
  className?: string
}

const StatCard = ({
  title,
  value,
  description,
  className = "",
}: StatCardProps) => {
  return (
    <div
      className={`p-6 ${theme.card.base} ${theme.card.hover} ${className}`}
    >
      <h3 className={`${theme.text.small} font-medium mb-2`}>{title}</h3>
      <p className={`text-3xl ${theme.text.title} mb-1`}>{value}</p>
      {description && <p className={theme.text.small}>{description}</p>}
    </div>
  )
}

export const NurseStats = () => {
  const getStatusColor = (value: number) => {
    if (value > 5) return "bg-[var(--color-accent-green)] text-white";
    if (value > 2) return "bg-[var(--color-accent-orange)] text-white";
    return "bg-[var(--color-accent-blue)] text-white";
  };
  const stats = {
    todayVisits: {
      total: 8,
      completed: 3,
      pending: 5,
    },
    weeklyStats: {
      totalVisits: 42,
      avgDuration: "38 min",
      satisfactionRate: "4.8/5",
    },
    tasks: {
      reportsPending: 3,
      medicationReminders: 2,
      followUps: 4,
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Today's Visits"
        value={stats.todayVisits.total}
        description={`${stats.todayVisits.completed} completed, ${stats.todayVisits.pending} pending`}
      />
      <StatCard
        title="Average Duration"
        value={stats.weeklyStats.avgDuration}
        description="Per visit this week"
      />
      <StatCard
        title="Patient Satisfaction"
        value={stats.weeklyStats.satisfactionRate}
        description="Based on 35 reviews"
      />
      <StatCard
        title="Pending Tasks"
        value={stats.tasks.reportsPending + stats.tasks.medicationReminders}
        description={`${stats.tasks.reportsPending} reports, ${stats.tasks.medicationReminders} reminders`}
      />
    </div>
  )
}
