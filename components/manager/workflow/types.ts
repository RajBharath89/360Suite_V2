// Workflow Types
export interface StageStatus {
  id: string
  name: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue'
  assignedTo?: string
  assignedToRole?: 'admin' | 'manager' | 'tester' | 'client'
  dueDate?: string
  completedAt?: string
  comments: Comment[]
  attachments: Attachment[]
  metadata?: Record<string, any>
}

export interface Stage {
  id: number
  name: string
  description: string
  icon: string
  statuses: StageStatus[]
  isRecurring?: boolean
  requiresApproval?: boolean
}

export interface ServiceTimeline {
  serviceId: string
  serviceName: string
  clientId: string
  version: number
  stages: Stage[]
  overallProgress: number
  currentStageId: number
  lastUpdated: string
  createdBy: string
  assignedManager?: string
  assignedTester?: string
}

export interface Comment {
  id: string
  author: string
  authorRole: string
  content: string
  timestamp: string
  isSystem: boolean
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  url: string
}

export interface Finding {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved'
  evidence: string[]
  poc: string[]
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  type: 'assignment' | 'escalation' | 'approval' | 'deadline' | 'feedback'
  title: string
  message: string
  recipient: string
  recipientRole: string
  relatedStageId: number
  relatedServiceId: string
  isRead: boolean
  createdAt: string
}

export interface ActivityLog {
  id: string
  action: string
  performedBy: string
  performedByRole: string
  timestamp: string
  details: Record<string, any>
  relatedTo: {
    type: 'stage' | 'service' | 'client'
    id: string
  }
}

export interface WorkflowFilter {
  manager?: string
  tester?: string
  status?: 'all' | 'active' | 'completed' | 'blocked' | 'overdue'
  clientSatisfaction?: 'all' | 'satisfied' | 'dissatisfied' | 'pending'
  clientId?: string
  serviceId?: string
}

export interface WorkflowState {
  currentClientId: string | null
  currentServiceId: string | null
  currentView: 'clients' | 'services' | 'timeline'
  filters: WorkflowFilter
  notifications: Notification[]
  activityLog: ActivityLog[]
}

export type UserRole = 'admin' | 'manager' | 'tester' | 'client'

