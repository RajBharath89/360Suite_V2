"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  XCircle,
  Bug,
  FileText,
  Footprints,
  AlertCircle,
  Wrench,
  Calendar,
  Plus,
  Pencil,
  Building2,
  Search,
  Home,
  Upload,
  File,
  Folder,
  Send,
  Clock,
  CheckCircle2,
  X
} from "lucide-react"
import { FindingForm, FindingFormData } from "@/components/ui/finding-form"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from "recharts"

interface Finding {
  id: number
  hostNames: string[]        // ⬅️ changed
  vulnerabilityName: string
  status: "Closed" | "Inprogress" | "Open"
  risk: "Critical" | "High" | "Medium" | "Low"
  cvssScore: number
  description: string
  stepsToReproduce: string[]
  impact: string
  recommendation: string
  auditPeriod: string
  approvalStatus: "draft" | "pending_approval" | "approved" | "rejected"
  submittedBy?: string
  submittedAt?: string
  approvedBy?: string
  approvedAt?: string
  rejectionReason?: string
  pocFiles: { name: string; type: "file" | "folder"; size?: string }[]
}

interface Client {
  id: string
  name: string
  industry: string
  status: "active" | "inactive"
  totalServices: number
  myFindings: number
}

interface Service {
  id: string
  name: string
  status: "active" | "inactive"
  auditPeriod: string
  totalFindings: number
}

const clientsData: Client[] = [
  { id: "1", name: "Pon Pure Chemicals India Pvt Ltd", industry: "Chemical Manufacturing", status: "active", totalServices: 6, myFindings: 5 },
  { id: "2", name: "Tech Corp International", industry: "Technology", status: "active", totalServices: 4, myFindings: 3 },
  { id: "3", name: "Global Finance Solutions", industry: "Financial Services", status: "active", totalServices: 5, myFindings: 4 },
]

const clientServicesData: Record<string, Service[]> = {
  "1": [
    { id: "S001", name: "API Security Assessment", status: "active", auditPeriod: "Quarterly", totalFindings: 12 },
    { id: "S002", name: "External Attack Surface Monitoring", status: "active", auditPeriod: "Monthly", totalFindings: 5 },
    { id: "S003", name: "Cloud Security Assessment", status: "active", auditPeriod: "Half-Yearly", totalFindings: 18 },
  ],
  "2": [
    { id: "S001", name: "API Security Assessment", status: "active", auditPeriod: "Quarterly", totalFindings: 8 },
    { id: "S002", name: "Cloud Security Assessment", status: "active", auditPeriod: "Half-Yearly", totalFindings: 12 },
  ],
  "3": [
    { id: "S001", name: "API Security Assessment", status: "active", auditPeriod: "Monthly", totalFindings: 15 },
    { id: "S002", name: "Dark Web Monitoring", status: "active", auditPeriod: "Daily", totalFindings: 12 },
  ],
}

const auditPeriodOptions = [
  { value: "Q4 2025", label: "Q4 2025 (Current Audit)" },
  { value: "Q3 2025", label: "Q3 2025" },
  { value: "Q2 2025", label: "Q2 2025" },
  { value: "Q1 2025", label: "Q1 2025" },
]

const initialFindings: Record<string, Record<string, Finding[]>> = {
  "1": {
    "API Security Assessment": [
      {
        id: 1,
        hostNames: ["192.168.2.10"],
        vulnerabilityName: "Improper implementation of Request rate limiting",
        status: "Open",
        risk: "High",
        cvssScore: 9.2,
        description: "Rate limiting is not properly implemented on the password reset endpoint.",
        stepsToReproduce: ["Open the vulnerable url", "Submit multiple requests", "Observe lack of rate limiting"],
        impact: "DOS attack and flooding attacks possible",
        recommendation: "Implement timeout after multiple requests or add CAPTCHA.",
        auditPeriod: "Q4 2025",
        approvalStatus: "draft",
        pocFiles: []
      },
      {
        id: 2,
       hostNames: ["192.168.2.10"],
        vulnerabilityName: "SQL Injection in user search functionality",
        status: "Open",
        risk: "Critical",
        cvssScore: 9.8,
        description: "SQL injection vulnerability found in the search parameter.",
        stepsToReproduce: ["Navigate to search page", "Enter SQL payload", "Observe database response"],
        impact: "Full database access and data exfiltration.",
        recommendation: "Use parameterized queries.",
        auditPeriod: "Q4 2025",
        approvalStatus: "pending_approval",
        submittedBy: "Current User",
        submittedAt: "2025-01-12",
        pocFiles: [{ name: "sql_injection_poc.png", type: "file", size: "128 KB" }]
      },
      {
        id: 3,
        hostNames: ["192.168.2.10"],
        vulnerabilityName: "Missing security headers",
        status: "Closed",
        risk: "Low",
        cvssScore: 3.1,
        description: "HTTP security headers are missing.",
        stepsToReproduce: ["Inspect HTTP response headers"],
        impact: "Minor security impact.",
        recommendation: "Add security headers.",
        auditPeriod: "Q4 2025",
        approvalStatus: "approved",
        submittedBy: "Current User",
        submittedAt: "2025-01-05",
        approvedBy: "Manager A",
        approvedAt: "2025-01-06",
        pocFiles: []
      }
    ]
  },
  "2": {
    "API Security Assessment": [
      {
        id: 1,
        hostNames: ["192.168.2.10"],
        vulnerabilityName: "Broken Authentication in OAuth Flow",
        status: "Open",
        risk: "Critical",
        cvssScore: 9.1,
        description: "OAuth implementation allows token reuse after logout.",
        stepsToReproduce: ["Login to application", "Capture token", "Logout and reuse token"],
        impact: "Session hijacking possible.",
        recommendation: "Implement proper token invalidation.",
        auditPeriod: "Q4 2025",
        approvalStatus: "rejected",
        submittedBy: "Current User",
        submittedAt: "2025-01-10",
        rejectionReason: "Need more detailed steps to reproduce",
        pocFiles: []
      }
    ]
  }
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "closed": return "bg-green-100 text-green-700 border-green-200"
    case "inprogress": return "bg-amber-100 text-amber-700 border-amber-200"
    case "open": return "bg-cyan-100 text-cyan-700 border-cyan-200"
    default: return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

function getRiskBadge(risk: string) {
  switch (risk.toLowerCase()) {
    case "critical": return "bg-red-100 text-red-700 border-red-200"
    case "high": return "bg-red-100 text-red-600 border-red-200"
    case "medium": return "bg-amber-100 text-amber-700 border-amber-200"
    case "low": return "bg-green-100 text-green-700 border-green-200"
    default: return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

function getApprovalBadge(status: string) {
  switch (status) {
    case "draft": return { class: "bg-gray-100 text-gray-700 border-gray-200", label: "Draft", icon: FileText }
    case "pending_approval": return { class: "bg-amber-100 text-amber-700 border-amber-200", label: "Pending", icon: Clock }
    case "approved": return { class: "bg-green-100 text-green-700 border-green-200", label: "Approved", icon: CheckCircle2 }
    case "rejected": return { class: "bg-red-100 text-red-700 border-red-200", label: "Rejected", icon: XCircle }
    default: return { class: "bg-gray-100 text-gray-700 border-gray-200", label: status, icon: FileText }
  }
}

interface TesterFindingsProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function TesterFindings({ onNavigate }: TesterFindingsProps) {
  const [currentView, setCurrentView] = useState<"clients" | "services" | "findings">("clients")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedAuditPeriod, setSelectedAuditPeriod] = useState("Q4 2025")
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [findings, setFindings] = useState<Record<string, Record<string, Finding[]>>>(initialFindings)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null)
  
  
  const [formData, setFormData] = useState<Partial<Finding>>({
  hostNames: [""],        // ⬅️ default one input
  vulnerabilityName: "",
  status: "Open",
  risk: "Medium",
  cvssScore: 5.0,
  description: "",
  stepsToReproduce: [""],
  impact: "",
  recommendation: "",
  auditPeriod: "Q4 2025",
  approvalStatus: "draft",
  pocFiles: []
})


  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredClients = useMemo(() => {
    return clientsData.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const clientServices = useMemo(() => {
    if (!selectedClient) return []
    return clientServicesData[selectedClient.id] || []
  }, [selectedClient])

  const activeFindings = useMemo(() => {
    if (!selectedClient || !selectedService) return []
    const clientFindings = findings[selectedClient.id] || {}
    const serviceFindings = clientFindings[selectedService.name] || []
    return serviceFindings.filter(f => f.auditPeriod === selectedAuditPeriod)
  }, [findings, selectedClient, selectedService, selectedAuditPeriod])

  const metrics = useMemo(() => {
    const total = activeFindings.length
    const draft = activeFindings.filter(f => f.approvalStatus === "draft").length
    const pending = activeFindings.filter(f => f.approvalStatus === "pending_approval").length
    const approved = activeFindings.filter(f => f.approvalStatus === "approved").length
    const rejected = activeFindings.filter(f => f.approvalStatus === "rejected").length
    
    return { total, draft, pending, approved, rejected }
  }, [activeFindings])

  const resetForm = () => {
    setFormData({
      hostNames: [""],
      vulnerabilityName: "",
      status: "Open",
      risk: "Medium",
      cvssScore: 5.0,
      description: "",
      stepsToReproduce: [""],
      impact: "",
      recommendation: "",
      auditPeriod: selectedAuditPeriod,
      approvalStatus: "draft",
      pocFiles: []
    })
  }

  const handleClientClick = (client: Client) => {
    setSelectedClient(client)
    setCurrentView("services")
    setSearchTerm("")
  }

  const handleServiceClick = (service: Service) => {
    setSelectedService(service)
    setCurrentView("findings")
  }

  const handleBackToClients = () => {
    setSelectedClient(null)
    setSelectedService(null)
    setCurrentView("clients")
    setSearchTerm("")
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    setCurrentView("services")
  }
const isSubmittingRef = React.useRef(false)
  const handleAddFinding = () => {
    if (isSubmittingRef.current) return
  isSubmittingRef.current = true
    if (!selectedClient || !selectedService) return
    
    const newFinding: Finding = {
  id: Date.now(),
  hostNames: formData.hostNames?.filter(h => h.trim() !== "") || [],
  vulnerabilityName: formData.vulnerabilityName || "",
  status: formData.status as Finding["status"],
  risk: formData.risk as Finding["risk"],
  cvssScore: formData.cvssScore || 5.0,
  description: formData.description || "",
  stepsToReproduce: formData.stepsToReproduce || [],
  impact: formData.impact || "",
  recommendation: formData.recommendation || "",
  auditPeriod: formData.auditPeriod || selectedAuditPeriod,
  approvalStatus: "draft",
  pocFiles: formData.pocFiles || []
}


    setFindings(prev => {
      const updated = { ...prev }
      if (!updated[selectedClient.id]) updated[selectedClient.id] = {}
      if (!updated[selectedClient.id][selectedService.name]) updated[selectedClient.id][selectedService.name] = []
      updated[selectedClient.id][selectedService.name] = [...updated[selectedClient.id][selectedService.name], newFinding]
      return updated
    })

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditFinding = () => {
    if (!selectedFinding || !selectedClient || !selectedService) return

    setFindings(prev => {
      const updated = { ...prev }
      const serviceFindings = updated[selectedClient.id]?.[selectedService.name] || []
      const index = serviceFindings.findIndex(f => f.id === selectedFinding.id)
      if (index !== -1) {
        serviceFindings[index] = {
          ...serviceFindings[index],
          hostNames: formData.hostNames?.filter(h => h.trim() !== "") || [],
          vulnerabilityName: formData.vulnerabilityName || "",
          status: formData.status as Finding["status"] || "Open",
          risk: formData.risk as Finding["risk"] || "Medium",
          cvssScore: formData.cvssScore || 5.0,
          description: formData.description || "",
          stepsToReproduce: formData.stepsToReproduce?.filter(s => s.trim() !== "") || [],
          impact: formData.impact || "",
          recommendation: formData.recommendation || "",
          auditPeriod: formData.auditPeriod || selectedAuditPeriod,
          pocFiles: formData.pocFiles || [],
          approvalStatus: "draft"
        }
        updated[selectedClient.id][selectedService.name] = [...serviceFindings]
      }
      return updated
    })

    setIsEditDialogOpen(false)
    setSelectedFinding(null)
    resetForm()
  }

  const handleSubmitForApproval = (finding: Finding, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedClient || !selectedService) return

    setFindings(prev => {
      const updated = { ...prev }
      const serviceFindings = updated[selectedClient.id]?.[selectedService.name] || []
      const index = serviceFindings.findIndex(f => f.id === finding.id)
      if (index !== -1) {
        serviceFindings[index] = {
          ...serviceFindings[index],
          approvalStatus: "pending_approval",
          submittedBy: "Current User",
          submittedAt: new Date().toISOString().split('T')[0]
        }
        updated[selectedClient.id][selectedService.name] = [...serviceFindings]
      }
      return updated
    })
  }

  const openEditDialog = (finding: Finding, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFinding(finding)
    setFormData({
  hostNames: finding.hostNames.length ? finding.hostNames : [""],
  vulnerabilityName: finding.vulnerabilityName,
  status: finding.status,
  risk: finding.risk,
  cvssScore: finding.cvssScore,
  description: finding.description,
  stepsToReproduce: finding.stepsToReproduce,
  impact: finding.impact,
  recommendation: finding.recommendation,
  auditPeriod: finding.auditPeriod,
  pocFiles: finding.pocFiles
})

    setIsEditDialogOpen(true)
  }


  const renderClientsView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl border-2 border-cyan-600 bg-cyan-50 flex items-center justify-center">
              <Shield className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">My Findings</h1>
              <p className="text-sm text-gray-600">Create and manage security findings</p>
            </div>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search clients..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-cyan-500" onClick={() => handleClientClick(client)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate" title={client.name}>
                    {client.name.length > 35 ? client.name.substring(0, 35) + "..." : client.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{client.industry}</p>
                </div>
                <Badge className="bg-cyan-100 text-cyan-700">{client.myFindings} findings</Badge>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-cyan-600" />
                  <span>{client.totalServices} Services</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderServicesView = () => (
    <div className="space-y-6">
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center text-sm text-gray-500">
          <button onClick={handleBackToClients} className="hover:text-cyan-600 transition-colors flex items-center gap-1"><Home className="h-4 w-4" /></button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">
            {selectedClient?.name && selectedClient.name.length > 35 ? selectedClient.name.substring(0, 35) + "..." : selectedClient?.name}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl border-2 border-cyan-600 bg-cyan-50 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-cyan-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {selectedClient?.name && selectedClient.name.length > 35 ? selectedClient.name.substring(0, 35) + "..." : selectedClient?.name}
            </h1>
            <p className="text-sm text-gray-600">Select a service to add findings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientServices.map(service => (
          <Card key={service.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500" onClick={() => handleServiceClick(service)}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Audit Period:</span>
                  <span className="font-medium">{service.auditPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">My Findings:</span>
                  <span className="font-medium">{service.totalFindings}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFindingsView = () => (
    <div className="space-y-6">
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <button onClick={handleBackToClients} className="hover:text-cyan-600 transition-colors flex items-center gap-1"><Home className="h-4 w-4" /></button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <button onClick={handleBackToServices} className="hover:text-cyan-600 transition-colors">
              {selectedClient?.name && selectedClient.name.length > 25 ? selectedClient.name.substring(0, 25) + "..." : selectedClient?.name}
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => { resetForm(); setFormData(prev => ({ ...prev, auditPeriod: selectedAuditPeriod })); setIsAddDialogOpen(true) }} className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
              <Plus className="h-4 w-4" />Add Finding
            </Button>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-white p-4 md:p-6 rounded-xl border border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl border-2 border-cyan-600 bg-cyan-50 flex items-center justify-center">
              <Shield className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{selectedService?.name}</h1>
              <p className="text-sm text-gray-600">{metrics.total} Findings | {metrics.draft} Draft | {metrics.pending} Pending</p>
            </div>
          </div>
          <Select value={selectedAuditPeriod} onValueChange={setSelectedAuditPeriod}>
            <SelectTrigger className="w-[200px] bg-white"><Calendar className="h-4 w-4 mr-2 text-gray-500" /><SelectValue /></SelectTrigger>
            <SelectContent>
              {auditPeriodOptions.map(option => (<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Draft</span>
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div className="text-3xl font-bold text-gray-700">{metrics.draft}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-amber-700">{metrics.pending}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Approved</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">{metrics.approved}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Rejected</span>
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-700">{metrics.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-cyan-600" />My Findings ({metrics.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {activeFindings.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No findings yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first finding for this service.</p>
              <Button onClick={() => { resetForm(); setFormData(prev => ({ ...prev, auditPeriod: selectedAuditPeriod })); setIsAddDialogOpen(true) }} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />Add First Finding
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">S.No</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">IP/Host</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Vulnerability</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Risk</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">CVSS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeFindings.map((finding, index) => {
                    const approvalBadge = getApprovalBadge(finding.approvalStatus)
                    const ApprovalIcon = approvalBadge.icon
                    return (
                      <React.Fragment key={finding.id}>
                        <tr className={`border-b hover:bg-gray-50 cursor-pointer ${expandedFinding === finding.id ? 'bg-cyan-50' : ''}`} onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}>
                          <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4 text-gray-800 font-medium">
  {(finding.hostNames ?? []).slice(0, 2).join(", ")}
  {(finding.hostNames?.length ?? 0) > 2 && (
    <span className="text-xs text-gray-500 ml-1">
      +{finding.hostNames.length - 2} more
    </span>
  )}
</td>
                          <td className="py-3 px-4"><div className="max-w-xs truncate">{finding.vulnerabilityName}</div></td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadge(finding.risk)}`}>{finding.risk}</span></td>
                          <td className="py-3 px-4"><span className={`font-semibold ${finding.cvssScore >= 7 ? 'text-red-600' : finding.cvssScore >= 4 ? 'text-amber-600' : 'text-green-600'}`}>{finding.cvssScore}</span></td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${approvalBadge.class}`}><ApprovalIcon className="h-3 w-3" />{approvalBadge.label}</span></td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {finding.approvalStatus === "draft" && (
                                <>
                                  <Tooltip><TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={(e) => handleSubmitForApproval(finding, e)}><Send className="h-4 w-4" /></Button>
                                  </TooltipTrigger><TooltipContent>Submit for Approval</TooltipContent></Tooltip>
                                  <Tooltip><TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50" onClick={(e) => openEditDialog(finding, e)}><Pencil className="h-4 w-4" /></Button>
                                  </TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip>
                                </>
                              )}
                              {finding.approvalStatus === "rejected" && (
                                <Tooltip><TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50" onClick={(e) => openEditDialog(finding, e)}><Pencil className="h-4 w-4" /></Button>
                                </TooltipTrigger><TooltipContent>Edit & Resubmit</TooltipContent></Tooltip>
                              )}
                              <Button variant="ghost" size="sm" className="text-gray-500">{expandedFinding === finding.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button>
                            </div>
                          </td>
                        </tr>
                        {expandedFinding === finding.id && (
                          <tr className="bg-gray-50">
                            <td colSpan={7} className="p-4">
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div><h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><Bug className="h-4 w-4 text-cyan-600" />Description</h4><p className="text-gray-700 text-sm">{finding.description}</p></div>
                                  <div><h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><AlertCircle className="h-4 w-4 text-red-500" />Impact</h4><p className="text-gray-700 text-sm">{finding.impact}</p></div>
                                </div>
                                <div><h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><Footprints className="h-4 w-4 text-amber-500" />Steps to Reproduce</h4><ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">{finding.stepsToReproduce.map((step, i) => (<li key={i}>{step}</li>))}</ol></div>
                                <div><h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><Wrench className="h-4 w-4 text-green-500" />Recommendation</h4><p className="text-gray-700 text-sm">{finding.recommendation}</p></div>
                                {finding.pocFiles.length > 0 && (
                                  <div><h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><File className="h-4 w-4 text-blue-500" />POC Files</h4>
                                    <div className="flex flex-wrap gap-2">{finding.pocFiles.map((file, i) => (
                                      <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                                        {file.type === "folder" ? <Folder className="h-4 w-4 text-amber-500" /> : <File className="h-4 w-4 text-blue-500" />}
                                        <span className="text-sm">{file.name}</span>
                                      </div>
                                    ))}</div>
                                  </div>
                                )}
                                {finding.approvalStatus === "approved" && (
                                  <div className="bg-green-50 p-3 rounded-lg"><p className="text-sm text-green-700">Approved by {finding.approvedBy} on {finding.approvedAt}</p></div>
                                )}
                                {finding.approvalStatus === "rejected" && (
                                  <div className="bg-red-50 p-3 rounded-lg"><p className="text-sm text-red-700 font-medium">Rejection Reason:</p><p className="text-sm text-red-600">{finding.rejectionReason}</p></div>
                                )}
                                <div className="flex gap-2 pt-2">
                                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setExpandedFinding(null) }}><XCircle className="h-4 w-4 mr-1" />Close</Button>
                                  {(finding.approvalStatus === "draft" || finding.approvalStatus === "rejected") && (
                                    <>
                                      <Button variant="outline" size="sm" onClick={(e) => openEditDialog(finding, e)}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
                                      {finding.approvalStatus === "draft" && (
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => handleSubmitForApproval(finding, e)}><Send className="h-4 w-4 mr-1" />Submit for Approval</Button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {isClient && activeFindings.length > 0 && (
        <Card><CardHeader><CardTitle className="text-base">Approval Status</CardTitle></CardHeader><CardContent><div className="h-[200px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: "Draft", value: metrics.draft, color: "#9ca3af" }, { name: "Pending", value: metrics.pending, color: "#f59e0b" }, { name: "Approved", value: metrics.approved, color: "#22c55e" }, { name: "Rejected", value: metrics.rejected, color: "#ef4444" }].filter(d => d.value > 0)} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{[{ color: "#9ca3af" }, { color: "#f59e0b" }, { color: "#22c55e" }, { color: "#ef4444" }].map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><RechartsTooltip /></PieChart></ResponsiveContainer></div></CardContent></Card>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentView === "clients" && renderClientsView()}
          {currentView === "services" && renderServicesView()}
          {currentView === "findings" && renderFindingsView()}
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl"><DialogHeader><DialogTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-cyan-600" />Add New Finding</DialogTitle><DialogDescription>Add a new security finding for {selectedService?.name}</DialogDescription></DialogHeader><FindingForm formData={formData} setFormData={setFormData} auditPeriodOptions={auditPeriodOptions} /><DialogFooter><Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button><Button
  type="button"
  onClick={handleAddFinding}
  className="bg-cyan-600 hover:bg-cyan-700"
  disabled={
    !formData.hostNames?.some(h => h.trim()) ||
    !formData.vulnerabilityName ||
    !formData.description
  }
>
  <Plus className="h-4 w-4 mr-2" />
  Add Finding
</Button></DialogFooter></DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl"><DialogHeader><DialogTitle className="flex items-center gap-2"><Pencil className="h-5 w-5 text-cyan-600" />Edit Finding</DialogTitle><DialogDescription>Update the security finding details</DialogDescription></DialogHeader><FindingForm formData={formData} setFormData={setFormData} auditPeriodOptions={auditPeriodOptions} /><DialogFooter><Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button><Button
  type="button"
  onClick={handleEditFinding}
  className="bg-cyan-600 hover:bg-cyan-700"
>
  <CheckCircle className="h-4 w-4 mr-2" />
  Save as Draft
</Button></DialogFooter></DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
