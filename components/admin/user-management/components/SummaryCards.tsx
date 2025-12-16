import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle, XCircle, Crown, UserCheck, Shield } from "lucide-react"

interface SummaryCardsProps {
  summaryStats: {
    total: number
    active: number
    inactive: number
    admin: number
    manager: number
    tester: number
  }
}

export const SummaryCards = ({ summaryStats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Users</p>
              <p className="text-xl font-bold text-blue-600">{summaryStats.total}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <Users className="h-4 w-4 text-blue-600" />
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

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Inactive</p>
              <p className="text-xl font-bold text-gray-600">{summaryStats.inactive}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <XCircle className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Admin</p>
              <p className="text-xl font-bold text-red-600">{summaryStats.admin}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <Crown className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Manager</p>
              <p className="text-xl font-bold text-cyan-600">{summaryStats.manager}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <UserCheck className="h-4 w-4 text-cyan-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Tester</p>
              <p className="text-xl font-bold text-teal-600">{summaryStats.tester}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <Shield className="h-4 w-4 text-teal-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
