import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, XCircle } from "lucide-react"

interface SummaryCardsProps {
  summaryStats: {
    total: number
    active: number
    inactive: number
  }
}

export const SummaryCards = ({ summaryStats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Services</p>
              <p className="text-xl font-bold text-blue-600">{summaryStats.total}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <BookOpen className="h-4 w-4 text-blue-600" />
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

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Inactive</p>
              <p className="text-xl font-bold text-red-600">{summaryStats.inactive}</p>
            </div>
            <div className="h-8 w-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
