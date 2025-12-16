import { Card, CardContent } from "@/components/ui/card"
import { Building2, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react"

interface SummaryCardsProps {
  summaryStats: {
    total: number
    active: number
    completed: number
    inProgress: number
    blocked: number
    overdue: number
  }
}

export const SummaryCards = ({ summaryStats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Clients</p>
              <p className="text-xl font-bold text-blue-600">{summaryStats.total}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <Building2 className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Active</p>
              <p className="text-xl font-bold text-green-600">{summaryStats.active}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Completed</p>
              <p className="text-xl font-bold text-cyan-600">{summaryStats.completed}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="h-4 w-4 text-cyan-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">In Progress</p>
              <p className="text-xl font-bold text-amber-600">{summaryStats.inProgress}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Blocked</p>
              <p className="text-xl font-bold text-red-600">{summaryStats.blocked}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Overdue</p>
              <p className="text-xl font-bold text-yellow-600">{summaryStats.overdue}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
