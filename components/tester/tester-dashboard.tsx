"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardDataProcessor } from "@/components/admin/dashboard/data/dashboardData"
import { DashboardCharts } from "@/components/admin/dashboard/components/DashboardCharts"
import { DashboardFilters } from "@/components/admin/dashboard/components/DashboardFilters"
import { SummaryCards as WorkflowSummaryCards } from "@/components/admin/dashboard/components/SummaryCards"
import { mockTimelines } from "@/components/tester/workflow/data/mockWorkflowData"
import { BarChart3, PieChart as PieChartIcon, Ticket } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"

export default function TesterDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })
  const [selectedClient, setSelectedClient] = useState("all")
  const [selectedServiceType, setSelectedServiceType] = useState("all")

  const dataProcessor = useMemo(() => new DashboardDataProcessor(mockTimelines), [])

  const clients = useMemo(() => {
    const idToName: Record<string, string> = { '1': 'TechCorp Solutions', '2': 'FinanceFirst Bank', '3': 'HealthCare Plus' }
    return Array.from(new Set(mockTimelines.map(t => idToName[t.clientId] || `Client ${t.clientId}`)))
  }, [])

  const serviceTypes = useMemo(() => Array.from(new Set(mockTimelines.map(t => t.serviceName))), [])

  const filteredData = useMemo(() => {
    let filtered = mockTimelines
    if (selectedClient !== "all") {
      const map: Record<string, string> = { 'TechCorp Solutions': '1', 'FinanceFirst Bank': '2', 'HealthCare Plus': '3' }
      const clientId = map[selectedClient]
      if (clientId) filtered = filtered.filter(t => t.clientId === clientId)
    }
    if (selectedServiceType !== "all") filtered = filtered.filter(t => t.serviceName === selectedServiceType)
    if (dateRange?.from) {
      filtered = filtered.filter(t => {
        const date = new Date(t.lastUpdated)
        if (dateRange.from && date < dateRange.from) return false
        if (dateRange.to && date > dateRange.to) return false
        return true
      })
    }
    return filtered
  }, [dateRange, selectedClient, selectedServiceType])

  const filteredProcessor = useMemo(() => new DashboardDataProcessor(filteredData), [filteredData])

  const metrics = filteredProcessor.getOverallMetrics()
  const stageStatusData = filteredProcessor.getStageStatusDistribution()
  const clientPerformanceData = filteredProcessor.getClientPerformance()
  const serviceTypeData = filteredProcessor.getServiceTypeAnalysis()
  const timelineTrendsData = filteredProcessor.getTimelineTrends()
  const teamWorkloadData = filteredProcessor.getTeamWorkload()

  const handleResetFilters = () => {
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    })
    setSelectedClient("all")
    setSelectedServiceType("all")
  }

  const dashboardTickets = useMemo(() => ([
    { id: "201", status: "in_progress" },
    { id: "202", status: "open" },
    { id: "203", status: "open" },
    { id: "204", status: "resolved" }
  ]), [])

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
  const ticketStatusData = useMemo(() => {
    const counts: Record<string, number> = {}
    dashboardTickets.forEach(t => { counts[t.status] = (counts[t.status] ?? 0) + 1 })
    return Object.entries(counts).map(([name, value], idx) => ({ name, value, color: COLORS[idx % COLORS.length] }))
  }, [dashboardTickets])
  const backlogAgingData = useMemo(() => ([
    { bucket: '0-3d', tickets: 2 },
    { bucket: '4-7d', tickets: 1 },
    { bucket: '8-14d', tickets: 0 },
    { bucket: '15+d', tickets: 1 }
  ]), [])

  return (
    <div className="p-6 space-y-6">
      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <BarChart3 className="h-7 w-7 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
                <p className="text-gray-600 text-sm">Comprehensive workflow insights and performance metrics</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DashboardFilters
        dateRange={dateRange}
        selectedClient={selectedClient}
        selectedServiceType={selectedServiceType}
        onDateRangeChange={setDateRange}
        onClientChange={setSelectedClient}
        onServiceTypeChange={setSelectedServiceType}
        onResetFilters={handleResetFilters}
        clients={clients}
        serviceTypes={serviceTypes}
      />

      <WorkflowSummaryCards metrics={metrics} />

      <DashboardCharts
        stageStatusData={stageStatusData}
        clientPerformanceData={clientPerformanceData}
        serviceTypeData={serviceTypeData}
        timelineTrendsData={timelineTrendsData}
        teamWorkloadData={teamWorkloadData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-green-600" />
              Ticket Status Distribution
            </CardTitle>
            <CardDescription>Open, In Progress, On Hold, Resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={ticketStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={30} paddingAngle={2} labelLine={false} label={({ name, value, percent }) => value > 0 ? `${name}\n${value} (${(percent * 100).toFixed(0)}%)` : ''}>
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} tickets`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-amber-600" />
              Backlog Aging
            </CardTitle>
            <CardDescription>Open tickets by age bucket</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={backlogAgingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bucket" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(v:number) => [`${v}`, 'Tickets']} />
                <Bar dataKey="tickets" fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-cyan-50 to-green-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="text-2xl">Key Insights</CardTitle>
          <CardDescription className="text-lg">Automated analysis of your workflow performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Performance</span>
              </div>
              <p className="text-sm text-gray-600">{metrics.averageProgress}% average completion rate across all workflows</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Efficiency</span>
              </div>
              <p className="text-sm text-gray-600">{metrics.activeWorkflows} active workflows with {metrics.completedWorkflows} completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Attention</span>
              </div>
              <p className="text-sm text-gray-600">{metrics.blockedWorkflows + metrics.overdueWorkflows} workflows need immediate attention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
