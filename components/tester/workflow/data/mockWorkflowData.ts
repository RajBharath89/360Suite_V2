import { ServiceTimeline, Stage, Comment, Attachment, Finding } from "../types"

export const mockUsers = {
  admins: ["Admin User", "Super Admin"],
  managers: ["John Manager", "Sarah Manager", "Mike Manager"],
  testers: ["Alice Tester", "Bob Tester", "Charlie Tester"],
  clients: ["TechCorp Solutions", "FinanceFirst Bank", "HealthCare Plus"]
}

export const mockComments: Comment[] = [
  {
    id: "1",
    author: "Admin User",
    authorRole: "admin",
    content: "Client onboarding completed successfully",
    timestamp: "2024-01-15T10:00:00Z",
    isSystem: false
  },
  {
    id: "2",
    author: "System",
    authorRole: "system",
    content: "Client assigned to John Manager",
    timestamp: "2024-01-15T10:15:00Z",
    isSystem: true
  },
  {
    id: "3",
    author: "John Manager",
    authorRole: "manager",
    content: "Reviewed and verified scope. Ready to proceed.",
    timestamp: "2024-01-16T09:00:00Z",
    isSystem: false
  }
]

export const mockAttachments: Attachment[] = [
  {
    id: "1",
    name: "SLA Document.pdf",
    type: "application/pdf",
    size: "2.5 MB",
    uploadedBy: "Admin User",
    uploadedAt: "2024-01-15T10:00:00Z",
    url: "/uploads/sla-document.pdf"
  },
  {
    id: "2",
    name: "Contract Agreement.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: "1.2 MB",
    uploadedBy: "Admin User",
    uploadedAt: "2024-01-15T10:05:00Z",
    url: "/uploads/contract.docx"
  }
]

export const mockFindings: Finding[] = [
  {
    id: "1",
    title: "SQL Injection Vulnerability",
    description: "Found SQL injection vulnerability in login endpoint",
    severity: "high",
    status: "open",
    evidence: ["screenshot1.png", "code-snippet.txt"],
    poc: ["exploit-poc.py"],
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z"
  },
  {
    id: "2",
    title: "Weak Password Policy",
    description: "Password policy allows weak passwords",
    severity: "medium",
    status: "open",
    evidence: ["policy-doc.pdf", "config-file.conf"],
    poc: ["test-scenario.txt"],
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-01T11:00:00Z"
  },
  {
    id: "3",
    title: "Missing HTTPS Enforcement",
    description: "Application does not enforce HTTPS redirects",
    severity: "medium",
    status: "in-progress",
    evidence: ["network-traffic.pcap", "screenshot2.png"],
    poc: ["manual-test.md"],
    createdAt: "2024-02-02T09:00:00Z",
    updatedAt: "2024-02-02T14:30:00Z"
  }
]

const createStage = (
  id: number,
  name: string,
  icon: string,
  status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue',
  assignedTo?: string,
  progress?: number,
  comments: Comment[] = [],
  attachments: Attachment[] = []
): Stage => {
  const completedAt = status === 'completed' ? new Date().toISOString() : undefined
  const dueDate = new Date(Date.now() + (7 - id) * 24 * 60 * 60 * 1000).toISOString()

  return {
    id,
    name,
    description: `Stage ${id}: ${name}`,
    icon,
    statuses: [{
      id: `${id}-status`,
      name,
      status,
      assignedTo: assignedTo || "Unassigned",
      assignedToRole: id === 0 || id === 1 ? 'admin' : id >= 2 && id <= 4 ? 'manager' : id >= 5 && id <= 8 ? 'tester' : id === 9 ? 'manager' : 'client',
      dueDate,
      completedAt,
      comments,
      attachments
    }],
    isRecurring: false,
    requiresApproval: id === 9 || id === 10
  }
}

export const createMockTimeline = (
  serviceId: string,
  serviceName: string,
  clientId: string,
  currentStageId: number,
  progress: number
): ServiceTimeline => {
  const stages: Stage[] = []

  // Stage 0: Client Onboarding
  stages.push(createStage(
    0,
    "Client Onboarding",
    "📝",
    currentStageId < 0 ? 'completed' : currentStageId === 0 ? 'in-progress' : 'completed',
    "Admin User",
    currentStageId >= 1 ? 100 : currentStageId === 0 ? progress : 0,
    [mockComments[0]],
    [mockAttachments[0], mockAttachments[1]]
  ))

  // Stage 1: Client Assignment
  stages.push(createStage(
    1,
    "Client Assignment",
    "👤",
    currentStageId < 1 ? 'completed' : currentStageId === 1 ? 'in-progress' : 'completed',
    "Admin User",
    currentStageId >= 2 ? 100 : currentStageId === 1 ? progress : 0,
    [mockComments[1], mockComments[2]]
  ))

  // Stage 2: Client Review
  stages.push(createStage(
    2,
    "Client Review",
    "🔍",
    currentStageId < 2 ? 'completed' : currentStageId === 2 ? 'in-progress' : 'completed',
    "John Manager",
    currentStageId >= 3 ? 100 : currentStageId === 2 ? progress : 0
  ))

  // Stage 3: Service Assessment
  stages.push(createStage(
    3,
    "Service Assessment",
    "📊",
    currentStageId < 3 ? 'completed' : currentStageId === 3 ? 'in-progress' : 'completed',
    "John Manager",
    currentStageId >= 4 ? 100 : currentStageId === 3 ? progress : 0
  ))

  // Stage 4: Task Assignment
  stages.push(createStage(
    4,
    "Task Assignment",
    "📌",
    currentStageId < 4 ? 'completed' : currentStageId === 4 ? 'in-progress' : 'completed',
    "John Manager",
    currentStageId >= 5 ? 100 : currentStageId === 4 ? progress : 0
  ))

  // Stage 5: Pre-Task Assessment
  stages.push(createStage(
    5,
    "Pre-Task Assessment",
    "⚙️",
    currentStageId < 5 ? 'completed' : currentStageId === 5 ? 'in-progress' : 'completed',
    "Alice Tester",
    currentStageId >= 6 ? 100 : currentStageId === 5 ? progress : 0
  ))

  // Stage 6: Task Execution
  const taskExecutionComments = currentStageId === 6 ? [
    ...mockComments,
    {
      id: "6",
      author: "Alice Tester",
      authorRole: "tester",
      content: "Started working on penetration testing",
      timestamp: new Date().toISOString(),
      isSystem: false
    }
  ] : mockComments

  stages.push(createStage(
    6,
    "Task Execution",
    "🔧",
    currentStageId < 6 ? 'completed' : currentStageId === 6 ? 'in-progress' : 'completed',
    "Alice Tester",
    currentStageId >= 7 ? 100 : currentStageId === 6 ? progress : 0,
    taskExecutionComments
  ))

  // Stage 7: Report Generation
  stages.push(createStage(
    7,
    "Report Generation",
    "📄",
    currentStageId < 7 ? 'completed' : currentStageId === 7 ? 'in-progress' : 'completed',
    "Alice Tester",
    currentStageId >= 8 ? 100 : currentStageId === 7 ? progress : 0
  ))

  // Stage 8: Self-Review
  const stage8Status = currentStageId < 7 ? 'pending' : 
                      currentStageId === 7 ? 'pending' : 
                      currentStageId === 8 ? 'in-progress' : 
                      currentStageId > 8 ? 'completed' : 'pending'
  
  stages.push(createStage(
    8,
    "Self-Review",
    "✅",
    stage8Status,
    "Alice Tester",
    currentStageId >= 9 ? 100 : currentStageId === 8 ? progress : 0
  ))

  // Stage 9: Manager Review
  const stage9Status = currentStageId < 8 ? 'pending' : 
                      currentStageId === 8 ? 'pending' : 
                      currentStageId === 9 ? 'in-progress' : 
                      currentStageId > 9 ? 'completed' : 'pending'
  
  stages.push(createStage(
    9,
    "Manager Review",
    "👔",
    stage9Status,
    "John Manager",
    currentStageId >= 10 ? 100 : currentStageId === 9 ? progress : 0
  ))

  // Stage 10: Client Review
  const stage10Status = currentStageId < 9 ? 'pending' : 
                       currentStageId === 9 ? 'pending' : 
                       currentStageId === 10 ? 'in-progress' : 
                       currentStageId > 10 ? 'completed' : 'pending'
  
  stages.push(createStage(
    10,
    "Client Review",
    "🎯",
    stage10Status,
    "TechCorp Solutions",
    currentStageId > 10 ? 100 : currentStageId === 10 ? progress : 0
  ))

  return {
    serviceId,
    serviceName,
    clientId,
    version: 1,
    stages,
    overallProgress: progress,
    currentStageId,
    lastUpdated: new Date().toISOString(),
    createdBy: "Admin User",
    assignedManager: "John Manager",
    assignedTester: "Alice Tester"
  }
}

export const mockTimelines: ServiceTimeline[] = [
  // TechCorp Solutions - Penetration Testing
  createMockTimeline("1", "Penetration Testing", "1", 6, 65),
  // TechCorp Solutions - Vulnerability Assessment
  createMockTimeline("2", "Vulnerability Assessment", "1", 3, 45),
  // FinanceFirst Bank - Compliance Audit
  createMockTimeline("1", "Compliance Audit", "2", 8, 85),
  // FinanceFirst Bank - Security Assessment
  createMockTimeline("2", "Security Assessment", "2", 5, 55),
  // HealthCare Plus - HIPAA Compliance
  createMockTimeline("1", "HIPAA Compliance", "3", 4, 50)
]

