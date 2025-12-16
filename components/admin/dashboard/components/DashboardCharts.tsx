"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts"
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"

interface ChartData {
  name: string
  value: number
  color?: string
}

interface TimeSeriesData {
  date: string
  value: number
  category?: string
}

interface ClientPerformance {
  clientId: string
  clientName: string
  totalWorkflows: number
  completedWorkflows: number
  averageProgress: number
  satisfaction: 'satisfied' | 'dissatisfied' | 'pending'
}

interface ServiceTypeData {
  serviceType: string
  count: number
  averageProgress: number
  averageDuration: number
}

interface TeamWorkload {
  teamMember: string
  role: string
  activeTasks: number
  completedTasks: number
  overdueTasks: number
}

interface DashboardChartsProps {
  stageStatusData: ChartData[]
  clientPerformanceData: ClientPerformance[]
  serviceTypeData: ServiceTypeData[]
  timelineTrendsData: TimeSeriesData[]
  teamWorkloadData: TeamWorkload[]
}

const COLORS = ['#0891b2', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export function DashboardCharts({
  stageStatusData,
  clientPerformanceData,
  serviceTypeData,
  timelineTrendsData,
  teamWorkloadData
}: DashboardChartsProps) {
  
  const WorkflowProgressChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <BarChart3 className="h-5 w-5 text-cyan-600" />
          Workflow Progress Overview
        </CardTitle>
        <CardDescription>Current progress across all active workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={clientPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="clientName" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Progress']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="averageProgress" fill="#0891b2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const StageStatusChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <PieChartIcon className="h-5 w-5 text-green-600" />
          Stage Status Distribution
        </CardTitle>
        <CardDescription>Breakdown of workflow stages by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={stageStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => 
                value > 0 ? `${name}\n${value} (${(percent * 100).toFixed(0)}%)` : ''
              }
              outerRadius={90}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
              style={{ fontSize: '12px' }}
            >
              {stageStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} stages`,
                name
              ]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const ClientPerformanceChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Users className="h-5 w-5 text-cyan-600" />
          Client Performance Trends
        </CardTitle>
        <CardDescription>Client satisfaction and completion rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={clientPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="clientName" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'completedWorkflows' ? `${value} workflows` : `${value}%`,
                name === 'completedWorkflows' ? 'Completed' : 'Progress'
              ]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Area 
              type="monotone" 
              dataKey="completedWorkflows" 
              stackId="1" 
              stroke="#0891b2" 
              fill="#0891b2" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="averageProgress" 
              stackId="2" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const ServiceTypeChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <CheckCircle className="h-5 w-5 text-amber-600" />
          Service Type Distribution
        </CardTitle>
        <CardDescription>Distribution of services by type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={serviceTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ serviceType, count, percent }) => 
                `${serviceType}\n${count} services (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={90}
              innerRadius={30}
              fill="#8884d8"
              dataKey="count"
              paddingAngle={2}
              style={{ fontSize: '11px' }}
            >
              {serviceTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} services`,
                'Service Count'
              ]}
              labelFormatter={(label) => `Service: ${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const TimelineTrendsChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <TrendingUp className="h-5 w-5 text-cyan-600" />
          Timeline Trends
        </CardTitle>
        <CardDescription>Average progress over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timelineTrendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Progress']}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0891b2" 
              strokeWidth={3}
              dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0891b2', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const TeamWorkloadChart = () => (
    <Card className="h-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Clock className="h-5 w-5 text-red-600" />
          Team Workload Distribution
        </CardTitle>
        <CardDescription>Task distribution across team roles</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={teamWorkloadData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="role" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} tasks`,
                name === 'activeTasks' ? 'Active' : 
                name === 'completedTasks' ? 'Completed' : 'Overdue'
              ]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="activeTasks" stackId="a" fill="#0891b2" />
            <Bar dataKey="completedTasks" stackId="a" fill="#22c55e" />
            <Bar dataKey="overdueTasks" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WorkflowProgressChart />
      <StageStatusChart />
      <ClientPerformanceChart />
      <ServiceTypeChart />
      <TimelineTrendsChart />
      <TeamWorkloadChart />
    </div>
  )
}
