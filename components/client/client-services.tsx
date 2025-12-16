"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  FileText,
  Shield,
  Eye,
  TrendingUp
} from "lucide-react"

const subscribedServices = [
  {
    id: "S001",
    name: "API Security Assessment",
    status: "active",
    auditPeriod: "Quarterly",
    nextAudit: "2025-04-01",
    lastAudit: "2025-01-15",
    lastAuditScore: 8.5,
    totalFindings: 12,
    criticalFindings: 2,
    remediatedFindings: 8,
    hasSampleReport: true
  },
  {
    id: "S002",
    name: "External Attack Surface Monitoring",
    status: "active",
    auditPeriod: "Monthly",
    nextAudit: "2025-02-01",
    lastAudit: "2025-01-01",
    lastAuditScore: 9.2,
    totalFindings: 5,
    criticalFindings: 0,
    remediatedFindings: 5,
    hasSampleReport: true
  },
  {
    id: "S003",
    name: "Cloud Security Assessment",
    status: "active",
    auditPeriod: "Half-Yearly",
    nextAudit: "2025-07-01",
    lastAudit: "2024-12-15",
    lastAuditScore: 7.8,
    totalFindings: 18,
    criticalFindings: 3,
    remediatedFindings: 12,
    hasSampleReport: true
  },
  {
    id: "S004",
    name: "Dark Web Monitoring",
    status: "active",
    auditPeriod: "Weekly",
    nextAudit: "2025-01-22",
    lastAudit: "2025-01-15",
    lastAuditScore: null,
    totalFindings: 3,
    criticalFindings: 1,
    remediatedFindings: 2,
    hasSampleReport: false
  },
  {
    id: "S005",
    name: "Firewall Review",
    status: "inactive",
    auditPeriod: "Annually",
    nextAudit: null,
    lastAudit: "2024-06-15",
    lastAuditScore: 8.0,
    totalFindings: 8,
    criticalFindings: 1,
    remediatedFindings: 8,
    hasSampleReport: true
  },
  {
    id: "S006",
    name: "Phishing Simulation",
    status: "active",
    auditPeriod: "Quarterly",
    nextAudit: "2025-04-01",
    lastAudit: "2025-01-10",
    lastAuditScore: 6.5,
    totalFindings: 0,
    criticalFindings: 0,
    remediatedFindings: 0,
    hasSampleReport: true
  },
  {
    id: "S007",
    name: "Red Team Assessment",
    status: "inactive",
    auditPeriod: "Annually",
    nextAudit: null,
    lastAudit: null,
    lastAuditScore: null,
    totalFindings: 0,
    criticalFindings: 0,
    remediatedFindings: 0,
    hasSampleReport: true
  },
  {
    id: "S008",
    name: "Security Operation Centre - Monitoring",
    status: "active",
    auditPeriod: "Continuous",
    nextAudit: null,
    lastAudit: null,
    lastAuditScore: null,
    totalFindings: 45,
    criticalFindings: 5,
    remediatedFindings: 40,
    hasSampleReport: false
  }
]

interface ClientServicesProps {
  onBack: () => void
  onNavigate?: (page: string, data?: any) => void
}

export default function ClientServices({ onBack, onNavigate }: ClientServicesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredServices = useMemo(() => {
    return subscribedServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || service.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const summaryStats = useMemo(() => ({
    total: subscribedServices.length,
    active: subscribedServices.filter(s => s.status === "active").length,
    inactive: subscribedServices.filter(s => s.status === "inactive").length,
    totalFindings: subscribedServices.reduce((sum, s) => sum + s.totalFindings, 0),
    remediatedFindings: subscribedServices.reduce((sum, s) => sum + s.remediatedFindings, 0)
  }), [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400"
    if (score >= 9) return "text-green-600"
    if (score >= 7) return "text-teal-600"
    if (score >= 5) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-500 text-sm mt-1">View your subscribed security services and audit schedules</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-teal-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
                <p className="text-xs text-gray-500">Total Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.active}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.inactive}</p>
                <p className="text-xs text-gray-500">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalFindings}</p>
                <p className="text-xs text-gray-500">Total Findings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{Math.round((summaryStats.remediatedFindings / Math.max(summaryStats.totalFindings, 1)) * 100)}%</p>
                <p className="text-xs text-gray-500">Remediated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(service.status)}
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {service.auditPeriod}
                    </Badge>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(service.lastAuditScore)}`}>
                  {service.lastAuditScore !== null ? service.lastAuditScore.toFixed(1) : "N/A"}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Audit:</span>
                  <span className="font-medium">
                    {service.lastAudit ? new Date(service.lastAudit).toLocaleDateString() : "Not conducted"}
                  </span>
                </div>
                {service.status === "active" && service.nextAudit && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Next Audit:</span>
                    <span className="font-medium text-teal-600">
                      {new Date(service.nextAudit).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {service.totalFindings > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Remediation Progress:</span>
                      <span className="font-medium">{service.remediatedFindings}/{service.totalFindings}</span>
                    </div>
                    <Progress 
                      value={(service.remediatedFindings / service.totalFindings) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                {service.criticalFindings > 0 && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <span className="font-medium">{service.criticalFindings} Critical Finding{service.criticalFindings > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onNavigate?.("service-detail", { service })}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                {service.hasSampleReport && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Sample Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No services found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
