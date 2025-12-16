"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  ChevronDown,
  ChevronUp,
  XCircle,
  Bug,
  FileText,
  Footprints,
  AlertCircle,
  Wrench,
  Home,
  ChevronRight,
  Calendar
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip
} from "recharts"

interface Finding {
  id: number
  hostName: string
  vulnerabilityName: string
  status: "Closed" | "Inprogress" | "Open"
  risk: "Critical" | "High" | "Medium" | "Low"
  cvssScore: number
  description: string
  stepsToReproduce: string[]
  impact: string
  recommendation: string
}

const findingsByQuarter: Record<string, Finding[]> = {
  "Q4 2025": [
    {
      id: 1,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Improper implementation of Request rate limiting: Password reset page",
      status: "Closed",
      risk: "High",
      cvssScore: 9.2,
      description: "Rate limiting is used to control the rate of traffic sent or received by a network interface controller and is used to prevent DoS attacks. No rate limit means there is no mechanism to protect against the requests you made in a short frame of time",
      stepsToReproduce: [
        "Open the vulnerable url and navigate to password reset page.",
        "Enter user id and submit the generate OTP request",
        "Intercept and brute force the captured http request"
      ],
      impact: "This vulnerability lead to DOS attack and attacker can perform flooding attacks using email service and SMS service",
      recommendation: "We recommend to implement a timeout after a number of requests in a period of time or implement CAPTCHA mechanism on the form pages."
    },
    {
      id: 2,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Improper implement limiting on API endpoints",
      status: "Inprogress",
      risk: "Medium",
      cvssScore: 5.6,
      description: "The application does not properly implement rate limiting on certain endpoints.",
      stepsToReproduce: [
        "Navigate to the target endpoint",
        "Send multiple requests in quick succession",
        "Observe lack of rate limiting"
      ],
      impact: "Attackers can abuse the endpoint through excessive requests.",
      recommendation: "Implement proper rate limiting using token bucket or sliding window algorithms."
    },
    {
      id: 3,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Improper implementation of security headers",
      status: "Open",
      risk: "Low",
      cvssScore: 3.6,
      description: "Minor security misconfiguration detected in HTTP response headers.",
      stepsToReproduce: [
        "Access the configuration page",
        "Review security headers"
      ],
      impact: "Limited impact on overall security.",
      recommendation: "Update security headers configuration."
    },
    {
      id: 4,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Improper implementation of session management",
      status: "Open",
      risk: "Medium",
      cvssScore: 5.6,
      description: "Session management implementation needs improvement.",
      stepsToReproduce: [
        "Login to the application",
        "Monitor session tokens",
        "Verify session timeout behavior"
      ],
      impact: "Sessions may persist longer than intended.",
      recommendation: "Implement proper session timeout and invalidation."
    },
    {
      id: 5,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Improper implement limiting on login form",
      status: "Closed",
      risk: "Medium",
      cvssScore: 5.6,
      description: "Rate limiting on API endpoints has been addressed.",
      stepsToReproduce: [
        "Previous testing showed rate limiting issues",
        "Remediation has been applied"
      ],
      impact: "Previously allowed excessive API requests.",
      recommendation: "Continue monitoring rate limiting effectiveness."
    },
  ],
  "Q3 2025": [
    {
      id: 1,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "SQL Injection in search functionality",
      status: "Closed",
      risk: "Critical",
      cvssScore: 9.8,
      description: "SQL injection vulnerability found in the search parameter allowing database access.",
      stepsToReproduce: [
        "Navigate to search page",
        "Enter malicious SQL payload in search field",
        "Observe database response"
      ],
      impact: "Full database access and potential data exfiltration.",
      recommendation: "Use parameterized queries and input validation."
    },
    {
      id: 2,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Cross-Site Scripting (XSS) in comments",
      status: "Closed",
      risk: "High",
      cvssScore: 7.5,
      description: "Stored XSS vulnerability in comment section.",
      stepsToReproduce: [
        "Submit comment with script tag",
        "View page with submitted comment"
      ],
      impact: "Session hijacking and account takeover possible.",
      recommendation: "Implement proper output encoding and CSP headers."
    },
    {
      id: 3,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Insecure Direct Object Reference",
      status: "Inprogress",
      risk: "Medium",
      cvssScore: 6.5,
      description: "Users can access other users' data by modifying URL parameters.",
      stepsToReproduce: [
        "Login as user A",
        "Modify user ID in URL",
        "Access user B's data"
      ],
      impact: "Unauthorized data access.",
      recommendation: "Implement proper authorization checks."
    },
  ],
  "Q2 2025": [
    {
      id: 1,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Weak password policy",
      status: "Closed",
      risk: "Medium",
      cvssScore: 5.3,
      description: "Password policy allows weak passwords.",
      stepsToReproduce: [
        "Create account with weak password",
        "Password accepted without complexity requirements"
      ],
      impact: "Accounts vulnerable to brute force attacks.",
      recommendation: "Enforce strong password requirements."
    },
    {
      id: 2,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Missing HTTPS enforcement",
      status: "Closed",
      risk: "High",
      cvssScore: 7.4,
      description: "Application accessible over HTTP without redirect.",
      stepsToReproduce: [
        "Access site via HTTP",
        "Observe no redirect to HTTPS"
      ],
      impact: "Man-in-the-middle attacks possible.",
      recommendation: "Enable HSTS and redirect all HTTP to HTTPS."
    },
  ],
  "Q1 2025": [
    {
      id: 1,
      hostName: "192.168.2(DESKTOP-ANIL)",
      vulnerabilityName: "Outdated TLS version",
      status: "Closed",
      risk: "Medium",
      cvssScore: 5.9,
      description: "Server supports TLS 1.0 and 1.1.",
      stepsToReproduce: [
        "Scan server for TLS versions",
        "Observe TLS 1.0/1.1 support"
      ],
      impact: "Vulnerable to known TLS attacks.",
      recommendation: "Disable TLS 1.0 and 1.1, use TLS 1.2+."
    },
  ],
}

const quarterOptions = [
  { value: "Q4 2025", label: "Q4 2025 (Current)" },
  { value: "Q3 2025", label: "Q3 2025" },
  { value: "Q2 2025", label: "Q2 2025" },
  { value: "Q1 2025", label: "Q1 2025" },
]

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "closed":
      return "bg-green-100 text-green-700 border-green-200"
    case "inprogress":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "open":
      return "bg-cyan-100 text-cyan-700 border-cyan-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

function getRiskBadge(risk: string) {
  switch (risk.toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-700 border-red-200"
    case "high":
      return "bg-red-100 text-red-600 border-red-200"
    case "medium":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "low":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

interface ClientFindingsProps {
  onBack: () => void
  onNavigate?: (page: string, data?: any) => void
  serviceName?: string
}

export default function ClientFindings({ onBack, onNavigate, serviceName }: ClientFindingsProps) {
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null)
  const [selectedQuarter, setSelectedQuarter] = useState("Q4 2025")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const displayServiceName = serviceName || "Network Red Teaming"

  const activeFindings = useMemo(() => {
    return findingsByQuarter[selectedQuarter] || []
  }, [selectedQuarter])

  const metrics = useMemo(() => {
    const total = activeFindings.length
    const criticalCount = activeFindings.filter(f => f.risk === "Critical").length
    const highCount = activeFindings.filter(f => f.risk === "High").length
    const mediumCount = activeFindings.filter(f => f.risk === "Medium").length
    const lowCount = activeFindings.filter(f => f.risk === "Low").length
    const highRisk = activeFindings.filter(f => f.risk === "High" || f.risk === "Critical").length
    const fixed = activeFindings.filter(f => f.status === "Closed").length
    const avgCvss = total > 0 ? (activeFindings.reduce((sum, f) => sum + f.cvssScore, 0) / total).toFixed(1) : "0.0"
    
    return { total, criticalCount, highCount, mediumCount, lowCount, highRisk, fixed, avgCvss }
  }, [activeFindings])

  const severityData = useMemo(() => [
    { name: "Critical", value: metrics.criticalCount, color: "#ef4444" },
    { name: "High", value: metrics.highCount, color: "#f97316" },
    { name: "Medium", value: metrics.mediumCount, color: "#eab308" },
    { name: "Low", value: metrics.lowCount, color: "#22c55e" },
  ].filter(d => d.value > 0), [metrics])

  const statusData = useMemo(() => [
    { name: "Open", value: activeFindings.filter(f => f.status === "Open").length, color: "#0891b2" },
    { name: "In Progress", value: activeFindings.filter(f => f.status === "Inprogress").length, color: "#f59e0b" },
    { name: "Closed", value: activeFindings.filter(f => f.status === "Closed").length, color: "#22c55e" },
  ], [activeFindings])

  const cvssDistribution = useMemo(() => [
    { range: "0-3.9", count: activeFindings.filter(f => f.cvssScore < 4).length },
    { range: "4-6.9", count: activeFindings.filter(f => f.cvssScore >= 4 && f.cvssScore < 7).length },
    { range: "7-8.9", count: activeFindings.filter(f => f.cvssScore >= 7 && f.cvssScore < 9).length },
    { range: "9-10", count: activeFindings.filter(f => f.cvssScore >= 9).length },
  ], [activeFindings])

  const handleDownloadReport = () => {
    console.log("Downloading report for", selectedQuarter)
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <button 
              onClick={onBack} 
              className="hover:text-cyan-600 transition-colors flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <button 
              onClick={onBack} 
              className="hover:text-cyan-600 transition-colors text-cyan-600"
            >
              Services
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{displayServiceName}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-cyan-600 bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-cyan-600" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-gray-800">{displayServiceName}</h1>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{metrics.total} Findings</span>
                    <span className="text-cyan-600">{metrics.fixed} Fixed</span>
                    <span className="text-red-600">{metrics.highRisk} High Risk</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {quarterOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleDownloadReport}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-cyan-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Audit Period</p>
                    <p className="text-sm font-medium text-gray-800">Quarterly</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Audit Date</p>
                    <p className="text-sm font-medium text-gray-800">Oct 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Audit Date</p>
                    <p className="text-sm font-medium text-gray-800">Jan 15, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Scope</p>
                    <p className="text-sm font-medium text-gray-800">20 Assets</p>
                  </div>
                </div>
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
                <div className="text-4xl font-bold text-cyan-700">{metrics.total}</div>
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
                <div className="text-4xl font-bold text-red-700">{metrics.highRisk}</div>
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
                <div className="text-4xl font-bold text-green-700">{metrics.fixed}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+8.0%</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Average CVSS</span>
                  <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-amber-700">{metrics.avgCvss}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">-1.2</span>
                  <span className="text-gray-500">vs Last scan</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-600" />
                Findings ({metrics.total})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">S.No</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">IP/Host Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Vulnerability Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Risk</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">CVSS</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeFindings.map((finding, index) => (
                      <React.Fragment key={finding.id}>
                        <tr 
                          className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${expandedFinding === finding.id ? 'bg-cyan-50' : ''}`}
                          onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}
                        >
                          <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4 text-gray-800 font-medium">{finding.hostName}</td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs truncate text-gray-800" title={finding.vulnerabilityName}>
                              {finding.vulnerabilityName}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(finding.status)}`}>
                              {finding.status === "Inprogress" ? "In Progress" : finding.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadge(finding.risk)}`}>
                              {finding.risk}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${finding.cvssScore >= 7 ? 'text-red-600' : finding.cvssScore >= 4 ? 'text-amber-600' : 'text-green-600'}`}>
                              {finding.cvssScore}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                              {expandedFinding === finding.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          </td>
                        </tr>
                        {expandedFinding === finding.id && (
                          <tr className="bg-gray-50">
                            <td colSpan={7} className="p-4">
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                      <Bug className="h-4 w-4 text-cyan-600" />
                                      Vulnerability Name
                                    </h4>
                                    <p className="text-gray-700 text-sm">{finding.vulnerabilityName}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                      <AlertCircle className="h-4 w-4 text-red-500" />
                                      Description
                                    </h4>
                                    <p className="text-gray-700 text-sm">{finding.description}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                    <Footprints className="h-4 w-4 text-amber-500" />
                                    Steps to Reproduce
                                  </h4>
                                  <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                                    {finding.stepsToReproduce.map((step, i) => (
                                      <li key={i}>{step}</li>
                                    ))}
                                  </ol>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                      <AlertTriangle className="h-4 w-4 text-red-500" />
                                      Impact
                                    </h4>
                                    <p className="text-gray-700 text-sm">{finding.impact}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                      <Wrench className="h-4 w-4 text-green-500" />
                                      Fixing Recommendation
                                    </h4>
                                    <p className="text-gray-700 text-sm">{finding.recommendation}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setExpandedFinding(null)
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Close
                                  </Button>
                                  <Button 
                                    size="sm"
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download Report
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {isClient && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Severity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={severityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {severityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">CVSS Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cvssDistribution} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="range" type="category" width={50} />
                        <RechartsTooltip />
                        <Bar dataKey="count" fill="#0891b2" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
