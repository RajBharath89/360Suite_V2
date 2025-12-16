"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  Clock, 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronRight,
  Home
} from "lucide-react"
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell
} from "recharts"

interface ClientServiceDetailProps {
  serviceName: string
  onBack: () => void
  onScopeClick?: (scopeName: string) => void
}

const scopeData = [
  { id: 1, name: "192.168.2(DESKTOP-ANJI)", score: 8.5, status: "Closed", findings: 5, critical: 1, high: 3, medium: 1 },
  { id: 2, name: "192.168.2(DESKTOP-DEMO)", score: 8.7, status: "Inprogress", findings: 8, critical: 5, high: 2, medium: 1 },
  { id: 3, name: "10.0.0.5", score: 3.2, status: "Open", findings: 8, critical: 5, high: 2, medium: 1 },
  { id: 4, name: "192.15.10.*", score: 6.2, status: "Open", findings: 8, critical: 5, high: 2, medium: 1 },
  { id: 5, name: "192.128.2(DESKTOP-ANJI)", score: 10, status: "Closed", findings: 0, critical: 0, high: 0, medium: 0 },
]

const findingsBySeverity = [
  { severity: "Critical", count: 12, color: "#ef4444" },
  { severity: "High", count: 10, color: "#f59e0b" },
  { severity: "Medium", count: 18, color: "#22c55e" },
  { severity: "Low", count: 2, color: "#3b82f6" },
]

function getScoreColor(score: number) {
  if (score >= 8) return "text-cyan-600 border-cyan-600"
  if (score >= 5) return "text-amber-500 border-amber-500"
  return "text-red-500 border-red-500"
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "closed":
      return "bg-green-100 text-green-700"
    case "inprogress":
      return "bg-amber-100 text-amber-700"
    case "open":
      return "bg-cyan-100 text-cyan-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function ClientServiceDetail({ serviceName, onBack, onScopeClick }: ClientServiceDetailProps) {
  const [showVulnerabilityScope, setShowVulnerabilityScope] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    })
  }, [])

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Select date range"
    }
    if (dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
    }
    return format(dateRange.from, "MMM d, yyyy")
  }

  const serviceScore = 8.5
  const frequency = "Quarterly"
  const lastScan = "15/11/2025"
  const nextScan = "15/02/2026"

  const handleScopeClick = (scopeName: string) => {
    if (onScopeClick) {
      onScopeClick(scopeName)
    }
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <button 
              onClick={onBack} 
              className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{serviceName}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 ${getScoreColor(serviceScore)} flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0`}>
                  {serviceScore}
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-gray-800">{serviceName} - Detailed Report</h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 text-xs md:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" /> {frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 text-green-600" /> Last: {lastScan}
                    </span>
                    <span className="hidden md:inline text-gray-400">|</span>
                    <span>Next: {nextScan}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm cursor-pointer hover:border-cyan-300 transition-colors text-sm">
                          <Calendar className="h-4 w-4 text-cyan-600" />
                          <span>{formatDateRange()}</span>
                        </button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select date range for filtering</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 gap-2">
                      <Download className="h-4 w-4" />
                      Download Report
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download service report as PDF</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Vulnerabilities</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-cyan-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-cyan-700">29</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+13.5%</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">High Risk</span>
                  <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-700">16</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">-24.0%</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Fixed</span>
                  <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-700">9</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">-10.0%</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Average CVSS</span>
                  <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-amber-700">8.9</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+12</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Scope</CardTitle>
                  <p className="text-sm text-cyan-600">{scopeData.length} Result(s) Found</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show only vulnerability scope</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Switch checked={showVulnerabilityScope} onCheckedChange={setShowVulnerabilityScope} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter to show only scopes with vulnerabilities</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {scopeData
                .filter(item => !showVulnerabilityScope || item.findings > 0)
                .map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleScopeClick(item.name)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border-2 ${getScoreColor(item.score)} flex items-center justify-center text-lg font-bold`}>
                          {item.score}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <Info className="h-4 w-4 text-gray-400" />
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {item.findings > 0 ? (
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-600">{item.findings} Findings</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">0 Findings</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-medium">
                            {item.critical}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs flex items-center justify-center font-medium">
                            {item.high}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 text-xs flex items-center justify-center font-medium">
                            {item.medium}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to view vulnerability details for {item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Metrics & Trends</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <select className="h-8 px-2 rounded border border-gray-300 bg-white text-sm cursor-pointer">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Daily</option>
                    </select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select time granularity</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-4">Finding by Severity</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={findingsBySeverity} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="severity" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <RechartsTooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {findingsBySeverity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 justify-center mt-2">
                    {findingsBySeverity.map((item, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">Historical Comparison</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-600">Previous Score</span>
                      <span className="text-red-500 font-bold text-xl">72%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-600">Current Score</span>
                      <span className="text-amber-500 font-bold text-xl">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-600">Improvement</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-bold text-xl">03%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="bg-gray-100 border-t py-4 px-6 flex justify-between items-center text-sm text-gray-500">
          <span>Copyright. 2025. Necurity Solutions.</span>
          <span>Version 1.0.0</span>
        </footer>
      </div>
    </TooltipProvider>
  )
}
