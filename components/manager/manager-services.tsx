"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { 
  Search, 
  Calendar,
  Building2,
  User,
  UserPlus,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const availableTesters = [
  { id: "T001", name: "John Smith", specialization: "Web Security" },
  { id: "T002", name: "Emily Chen", specialization: "Cloud Security" },
  { id: "T003", name: "David Brown", specialization: "Network Security" },
  { id: "T004", name: "Lisa Anderson", specialization: "Social Engineering" },
  { id: "T005", name: "Robert Taylor", specialization: "Infrastructure" }
]

const initialAssignments = [
  {
    id: "SA001",
    client: "Tech Corp",
    service: "API Security Assessment",
    auditPeriod: "Q1 2025",
    dueDate: "2025-01-30",
    status: "assigned",
    assignedTester: { id: "T001", name: "John Smith" },
    lastAuditDate: "2024-10-15"
  },
  {
    id: "SA002",
    client: "Global Finance Ltd",
    service: "Cloud Security Assessment",
    auditPeriod: "Q1 2025",
    dueDate: "2025-02-05",
    status: "assigned",
    assignedTester: { id: "T002", name: "Emily Chen" },
    lastAuditDate: "2024-10-20"
  },
  {
    id: "SA003",
    client: "Healthcare Plus",
    service: "Dark Web Monitoring",
    auditPeriod: "Q1 2025",
    dueDate: "2025-02-10",
    status: "unassigned",
    assignedTester: null,
    lastAuditDate: "2024-11-01"
  },
  {
    id: "SA004",
    client: "Retail Solutions",
    service: "Phishing Simulation",
    auditPeriod: "Q1 2025",
    dueDate: "2025-02-15",
    status: "unassigned",
    assignedTester: null,
    lastAuditDate: "2024-11-10"
  },
  {
    id: "SA005",
    client: "Manufacturing Inc",
    service: "Firewall Review",
    auditPeriod: "Q1 2025",
    dueDate: "2025-02-20",
    status: "completed",
    assignedTester: { id: "T003", name: "David Brown" },
    lastAuditDate: "2024-11-15"
  },
  {
    id: "SA006",
    client: "Tech Corp",
    service: "Red Team Assessment",
    auditPeriod: "Q1 2025",
    dueDate: "2025-02-25",
    status: "in_progress",
    assignedTester: { id: "T001", name: "John Smith" },
    lastAuditDate: "2024-09-01"
  }
]

interface ManagerServicesProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function ManagerServices({ onNavigate }: ManagerServicesProps) {
  const { toast } = useToast()
  const [assignments, setAssignments] = useState(initialAssignments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [selectedTester, setSelectedTester] = useState<string>("")

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = assignment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.service.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [assignments, searchTerm, statusFilter])

  const summaryStats = useMemo(() => ({
    total: assignments.length,
    unassigned: assignments.filter(a => a.status === "unassigned").length,
    assigned: assignments.filter(a => a.status === "assigned").length,
    inProgress: assignments.filter(a => a.status === "in_progress").length,
    completed: assignments.filter(a => a.status === "completed").length
  }), [assignments])

  const handleAssignTester = (assignment: any) => {
    setSelectedAssignment(assignment)
    setSelectedTester(assignment.assignedTester?.id || "")
    setShowAssignDialog(true)
  }

  const confirmAssignment = () => {
    const tester = availableTesters.find(t => t.id === selectedTester)
    if (tester) {
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: "assigned", assignedTester: { id: tester.id, name: tester.name } }
          : a
      ))
      toast({
        title: "Tester Assigned",
        description: `${tester.name} has been assigned to ${selectedAssignment.service} for ${selectedAssignment.client}.`,
        variant: "default"
      })
    }
    setShowAssignDialog(false)
    setSelectedAssignment(null)
    setSelectedTester("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unassigned":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unassigned</Badge>
      case "assigned":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Assigned</Badge>
      case "in_progress":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Assignments</h1>
          <p className="text-gray-500 text-sm mt-1">Assign testers to upcoming service audits</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-teal-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
                <p className="text-xs text-gray-500">Total Audits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.unassigned}</p>
                <p className="text-xs text-gray-500">Unassigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.assigned}</p>
                <p className="text-xs text-gray-500">Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.inProgress}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.completed}</p>
                <p className="text-xs text-gray-500">Completed</p>
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
                placeholder="Search by client or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{assignment.client}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{assignment.service}</TableCell>
                  <TableCell className="text-sm">{assignment.auditPeriod}</TableCell>
                  <TableCell className="text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-sm text-gray-500">{new Date(assignment.lastAuditDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {assignment.assignedTester ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{assignment.assignedTester.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1"
                      onClick={() => handleAssignTester(assignment)}
                    >
                      <UserPlus className="w-4 h-4" />
                      {assignment.assignedTester ? "Reassign" : "Assign"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAssignments.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No service assignments found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Tester</DialogTitle>
            <DialogDescription>
              Select a tester to assign to this service audit.
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="py-4 space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{selectedAssignment.service}</p>
                <p className="text-sm text-gray-500">Client: {selectedAssignment.client}</p>
                <p className="text-sm text-gray-500">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Select Tester</label>
                <Select value={selectedTester} onValueChange={setSelectedTester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a tester..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTesters.map(tester => (
                      <SelectItem key={tester.id} value={tester.id}>
                        <div className="flex items-center gap-2">
                          <span>{tester.name}</span>
                          <span className="text-xs text-gray-500">({tester.specialization})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700" 
              onClick={confirmAssignment}
              disabled={!selectedTester}
            >
              Assign Tester
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
