// Stage Configuration
export const STAGE_CONFIG = [
  {
    id: 0,
    name: "Client Onboarding",
    description: "Admin creates or imports client data including name, contact information, contract, service list, and SLA details",
    icon: "📝",
    assignedTo: "admin",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 1,
    name: "Client Assignment",
    description: "Admin assigns the client to a Manager for review and handling",
    icon: "👤",
    assignedTo: "admin",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 2,
    name: "Client Review",
    description: "Manager reviews assigned client and associated services, verifying scope, deadlines, deliverables, and SLA parameters",
    icon: "🔍",
    assignedTo: "manager",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 3,
    name: "Service Assessment",
    description: "Manager assesses potential challenges such as client dependencies, resource shortages, and other blockers",
    icon: "📊",
    assignedTo: "manager",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 4,
    name: "Task Assignment",
    description: "Manager assigns each service as a task to a Tester with defined timelines per SLA",
    icon: "📌",
    assignedTo: "manager",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 5,
    name: "Pre-Task Assessment",
    description: "Tester evaluates possible challenges before starting work including dependencies on Manager, resource shortages, and other issues",
    icon: "⚙️",
    assignedTo: "tester",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 6,
    name: "Task Execution",
    description: "Tester works on the task with sub-stages: In Progress, Findings (with POCs), and Completion",
    icon: "🔧",
    assignedTo: "tester",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 7,
    name: "Report Generation",
    description: "Tester generates a detailed report (Word document) after completing the task",
    icon: "📄",
    assignedTo: "tester",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 8,
    name: "Self-Review",
    description: "Tester reviews their own report for accuracy and completeness",
    icon: "✅",
    assignedTo: "tester",
    isRecurring: false,
    requiresApproval: false
  },
  {
    id: 9,
    name: "Manager Review",
    description: "Tester submits reviewed report to Manager for approval or rejection",
    icon: "👔",
    assignedTo: "manager",
    isRecurring: false,
    requiresApproval: true
  },
  {
    id: 10,
    name: "Client Review",
    description: "Approved report is sent to Client for evaluation. Client can mark as satisfied or provide feedback",
    icon: "🎯",
    assignedTo: "client",
    isRecurring: false,
    requiresApproval: true
  }
]

export const getStageConfig = (stageId: number) => {
  return STAGE_CONFIG.find(stage => stage.id === stageId) || STAGE_CONFIG[0]
}

export const getStageStatus = (stage: any): 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue' => {
  if (!stage) return 'pending'
  return stage.currentStatus || 'pending'
}

export const getStageProgress = (stage: any): number => {
  if (!stage) return 0
  if (stage.currentStatus === 'completed') return 100
  if (stage.currentStatus === 'in-progress') return stage.progress || 50
  return 0
}

export const canAccessStage = (stageId: number, userRole: string): boolean => {
  const stage = getStageConfig(stageId)
  return stage.assignedTo === userRole || userRole === 'admin'
}

export const getNextStage = (currentStageId: number) => {
  return STAGE_CONFIG.find(stage => stage.id === currentStageId + 1)
}

export const getPreviousStage = (currentStageId: number) => {
  return STAGE_CONFIG.find(stage => stage.id === currentStageId - 1)
}

export const getStagesForRole = (userRole: string) => {
  if (userRole === 'admin') {
    return STAGE_CONFIG
  }
  if (userRole === 'manager') {
    return STAGE_CONFIG.filter(stage => 
      stage.assignedTo === 'manager' || stage.id === 9
    )
  }
  if (userRole === 'tester') {
    return STAGE_CONFIG.filter(stage => 
      stage.assignedTo === 'tester'
    )
  }
  if (userRole === 'client') {
    return STAGE_CONFIG.filter(stage => 
      stage.assignedTo === 'client'
    )
  }
  return STAGE_CONFIG
}
