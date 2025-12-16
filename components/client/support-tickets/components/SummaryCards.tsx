import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock, CheckCircle, LifeBuoy, XCircle, CheckCheck } from "lucide-react"

interface SummaryStats {
  open: number
  inProgress: number
  completed: number
  resolved: number
  canceled: number
  total: number
}

export function SummaryCards({ summaryStats }: { summaryStats: SummaryStats }) {
  const { open, inProgress, completed, resolved, canceled, total } = summaryStats
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-red-700">{open}</p>
            </div>
            <div className="h-8 w-8 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-700">{inProgress}</p>
            </div>
            <div className="h-8 w-8 bg-blue-600/20 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-emerald-700">{completed}</p>
            </div>
            <div className="h-8 w-8 bg-emerald-600/20 rounded-full flex items-center justify-center">
              <CheckCheck className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">{resolved}</p>
            </div>
            <div className="h-8 w-8 bg-green-600/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Canceled</p>
              <p className="text-2xl font-bold text-slate-700">{canceled}</p>
            </div>
            <div className="h-8 w-8 bg-slate-600/20 rounded-full flex items-center justify-center">
              <XCircle className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 shadow-sm p-3">
        <CardContent className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-cyan-700">{total}</p>
            </div>
            <div className="h-8 w-8 bg-cyan-600/20 rounded-full flex items-center justify-center">
              <LifeBuoy className="h-5 w-5 text-cyan-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
