"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3
} from "lucide-react"

interface DashboardMetrics {
  totalWorkflows: number
  activeWorkflows: number
  completedWorkflows: number
  blockedWorkflows: number
  overdueWorkflows: number
  averageProgress: number
  totalClients: number
  totalServices: number
}

interface SummaryCardsProps {
  metrics: DashboardMetrics
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Workflows",
      value: metrics.totalWorkflows,
      icon: BarChart3,
      color: "text-cyan-600",
      bgColor: "bg-cyan-600/20",
      cardBg: "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200",
      valueColor: "text-cyan-700",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Active Workflows",
      value: metrics.activeWorkflows,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-600/20",
      cardBg: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
      valueColor: "text-amber-700",
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Completed",
      value: metrics.completedWorkflows,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-600/20",
      cardBg: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      valueColor: "text-green-700",
      change: "+15%",
      changeType: "positive" as const
    },
    {
      title: "Blocked/Overdue",
      value: metrics.blockedWorkflows + metrics.overdueWorkflows,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-600/20",
      cardBg: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
      valueColor: "text-red-700",
      change: "-5%",
      changeType: "negative" as const
    },
    {
      title: "Avg Progress",
      value: `${metrics.averageProgress}%`,
      icon: TrendingUp,
      color: "text-teal-600",
      bgColor: "bg-teal-600/20",
      cardBg: "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200",
      valueColor: "text-teal-700",
      change: "+3%",
      changeType: "positive" as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.cardBg} shadow-sm hover:shadow-lg transition-shadow`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{card.title}</span>
              <div className={`w-8 h-8 rounded-full ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <div className={`text-4xl font-bold ${card.valueColor}`}>{card.value}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span 
                className={`font-medium ${
                  card.changeType === 'positive' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}
              >
                {card.change}
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
