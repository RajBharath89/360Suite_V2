"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  ArrowLeft, 
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
  ChevronRight
} from "lucide-react"

interface ClientScopeDetailProps {
  serviceName: string
  scopeName: string
  onBack: () => void
}

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

const findingsData: Finding[] = [
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
    vulnerabilityName: "Improper implement limiting...",
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
    vulnerabilityName: "Improper implementation...",
    status: "Open",
    risk: "Low",
    cvssScore: 3.6,
    description: "Minor security misconfiguration detected.",
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
    vulnerabilityName: "Improper implementation...",
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
    vulnerabilityName: "Improper implement limiting...",
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

export default function ClientScopeDetail({ serviceName, scopeName, onBack }: ClientScopeDetailProps) {
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null)

  const scopeScore = 5.9
  const totalVulnerabilities = 5
  const highRisk = 1
  const fixed = 3
  const avgCvss = 5.9

  const criticalCount = findingsData.filter(f => f.risk === "Critical").length
  const highCount = findingsData.filter(f => f.risk === "High").length
  const mediumCount = findingsData.filter(f => f.risk === "Medium").length

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 mx-2" />
            <button 
              onClick={onBack} 
              className="hover:text-cyan-600 transition-colors"
            >
              {serviceName}
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{scopeName}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-cyan-600 bg-cyan-50 flex items-center justify-center text-xl md:text-2xl font-bold text-cyan-600 flex-shrink-0">
                  {scopeScore}
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-gray-800">{scopeName}</h1>
                  <div className="text-xs md:text-sm text-cyan-600 mt-0.5">{serviceName}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                  <span className="text-gray-700 text-sm md:text-base">{totalVulnerabilities} Findings</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-red-100 text-red-600 text-xs md:text-sm flex items-center justify-center font-medium">
                    {criticalCount}
                  </span>
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-amber-100 text-amber-600 text-xs md:text-sm flex items-center justify-center font-medium">
                    {highCount}
                  </span>
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-cyan-100 text-cyan-600 text-xs md:text-sm flex items-center justify-center font-medium">
                    {mediumCount}
                  </span>
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
                <div className="text-4xl font-bold text-cyan-700">{totalVulnerabilities}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+13.5</span>
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
                <div className="text-4xl font-bold text-red-700">{highRisk}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">-24.0</span>
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
                <div className="text-4xl font-bold text-green-700">{fixed}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">-10.0</span>
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
                <div className="text-4xl font-bold text-amber-700">{avgCvss}</div>
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
                  <CardTitle className="text-base">Findings</CardTitle>
                  <p className="text-sm text-cyan-600">{findingsData.length} Result(s) Found</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 border-y">
                    <tr>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">S. No</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">IP / Host Name</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">Vulnerability Name</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">Risk</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">CVSS</th>
                      <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {findingsData.map((finding, index) => (
                      <>
                        <tr 
                          key={finding.id} 
                          className={`border-b hover:bg-gray-50 cursor-pointer ${expandedFinding === finding.id ? 'bg-gray-50' : ''}`}
                          onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}
                        >
                          <td className="py-4 px-4 text-sm text-gray-700">{index + 1}</td>
                          <td className="py-4 px-4 text-sm text-gray-700">{finding.hostName}</td>
                          <td className="py-4 px-4 text-sm text-gray-700 max-w-xs truncate">{finding.vulnerabilityName.substring(0, 30)}...</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(finding.status)}`}>
                              {finding.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadge(finding.risk)}`}>
                              {finding.risk}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700 font-medium">{finding.cvssScore}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {expandedFinding === finding.id ? (
                                <ChevronUp className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedFinding === finding.id && (
                          <tr key={`expanded-${finding.id}`}>
                            <td colSpan={7} className="bg-gray-50 border-b">
                              <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-cyan-600 font-medium">{finding.hostName}</div>
                                  <select className="h-8 px-3 rounded border border-gray-300 bg-white text-sm">
                                    <option>Current Report</option>
                                    <option>Previous Report</option>
                                  </select>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="flex items-start gap-2">
                                    <Bug className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-cyan-600 text-sm">Vulnerability Name</div>
                                      <p className="text-sm text-gray-700 mt-1">{finding.vulnerabilityName}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FileText className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-cyan-600 text-sm">Description</div>
                                      <p className="text-sm text-gray-700 mt-1">{finding.description}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <Footprints className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-green-600 text-sm">Steps to Reproduce</div>
                                      <ol className="text-sm text-gray-700 mt-1 list-decimal list-inside space-y-1">
                                        {finding.stepsToReproduce.map((step, i) => (
                                          <li key={i}>{step}</li>
                                        ))}
                                      </ol>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-red-500 text-sm">Impact</div>
                                      <p className="text-sm text-gray-700 mt-1">{finding.impact}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <Wrench className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-amber-500 text-sm">Fixing Recommendation</div>
                                      <p className="text-sm text-gray-700 mt-1">{finding.recommendation}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                  <Button 
                                    variant="outline" 
                                    className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setExpandedFinding(null)
                                    }}
                                  >
                                    Close
                                  </Button>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button className="bg-cyan-600 hover:bg-cyan-700">
                                        View POC
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View Proof of Concept</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
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
