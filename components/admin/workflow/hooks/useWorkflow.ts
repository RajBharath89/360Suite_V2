import { useState, useMemo, useCallback } from 'react'
import { WorkflowState, WorkflowFilter, ServiceTimeline, Stage } from '../types'
import { mockTimelines } from '../data/mockWorkflowData'
import { mockClients } from '../../client-management/data/mock-data'
import { useToast } from '@/hooks/use-toast'

export function useWorkflow() {
  const { toast } = useToast()
  
  const [state, setState] = useState<WorkflowState>({
    currentClientId: null,
    currentServiceId: null,
    currentView: 'clients',
    filters: {
      status: 'all',
      clientSatisfaction: 'all'
    },
    notifications: [],
    activityLog: []
  })

  const [timelines] = useState<ServiceTimeline[]>(mockTimelines)
  const [clients] = useState(mockClients)

  // Get all clients with their services
  const clientsWithServices = useMemo(() => {
    return clients.map(client => {
      const services = client.services.map((service, index) => {
        const timeline = timelines.find(t => t.serviceId === service.id && t.clientId === client.id)
        return {
          ...service,
          timeline,
          progress: timeline?.overallProgress || 0,
          currentStage: timeline?.currentStageId || 0,
          status: timeline ? 
            timeline.currentStageId >= 10 ? 'completed' : 'in-progress' : 'pending'
        }
      })
      
      const totalProgress = services.reduce((sum, s) => sum + s.progress, 0) / services.length
      
      return {
        ...client,
        services,
        overallProgress: totalProgress
      }
    })
  }, [clients, timelines])

  // Filter clients based on current filters
  const filteredClients = useMemo(() => {
    let filtered = clientsWithServices

    if (state.filters.status !== 'all') {
      filtered = filtered.filter(client => {
        if (state.filters.status === 'active') {
          return client.services.some(s => s.status === 'in-progress')
        }
        if (state.filters.status === 'completed') {
          return client.services.every(s => s.status === 'completed')
        }
        if (state.filters.status === 'blocked') {
          return client.services.some(s => s.status === 'blocked')
        }
        if (state.filters.status === 'overdue') {
          return client.services.some(s => s.status === 'overdue')
        }
        return true
      })
    }

    if (state.filters.manager) {
      filtered = filtered.filter(client => {
        return client.services.some(s => s.timeline?.assignedManager === state.filters.manager)
      })
    }

    if (state.filters.tester) {
      filtered = filtered.filter(client => {
        return client.services.some(s => s.timeline?.assignedTester === state.filters.tester)
      })
    }

    return filtered
  }, [clientsWithServices, state.filters])

  // Get services for current client
  const currentClientServices = useMemo(() => {
    if (!state.currentClientId) return []
    
    const client = clientsWithServices.find(c => c.id === state.currentClientId)
    return client?.services || []
  }, [state.currentClientId, clientsWithServices])

  // Get timeline for current service
  const currentTimeline = useMemo(() => {
    if (!state.currentClientId || !state.currentServiceId) return null
    
    return timelines.find(
      t => t.clientId === state.currentClientId && t.serviceId === state.currentServiceId
    ) || null
  }, [state.currentClientId, state.currentServiceId, timelines])

  // Navigation handlers
  const navigateToClients = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'clients',
      currentClientId: null,
      currentServiceId: null
    }))
  }, [])

  const selectClient = useCallback((clientId: string) => {
    setState(prev => ({
      ...prev,
      currentView: 'services',
      currentClientId: clientId,
      currentServiceId: null
    }))
  }, [])

  const selectService = useCallback((serviceId: string) => {
    setState(prev => ({
      ...prev,
      currentView: 'timeline',
      currentServiceId: serviceId
    }))
  }, [])

  // Update filters
  const updateFilters = useCallback((filters: Partial<WorkflowFilter>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }))
  }, [])

  // Stage actions
  const updateStageStatus = useCallback((
    serviceId: string,
    clientId: string,
    stageId: number,
    status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue',
    progress?: number
  ) => {
    // Find the current timeline
    const timeline = timelines.find(t => t.clientId === clientId && t.serviceId === serviceId)
    if (!timeline) {
      toast({
        title: "Error",
        description: "Timeline not found",
        variant: "destructive"
      })
      return
    }

    // Validate sequential completion
    if (status === 'completed' || status === 'in-progress') {
      // Check if previous stage is completed (except for stage 1)
      if (stageId > 1) {
        const prevStage = timeline.stages.find(s => s.id === stageId - 1)
        const prevStageStatus = prevStage?.statuses[0]?.status || 'pending'
        
        if (prevStageStatus !== 'completed') {
          toast({
            title: "Cannot Complete Stage",
            description: `Stage ${stageId} cannot be ${status} because Stage ${stageId - 1} is not completed yet`,
            variant: "destructive"
          })
          return
        }
      }
    }

    toast({
      title: "Stage Updated",
      description: `Stage ${stageId} status updated to ${status}`,
    })

    // In a real app, this would update the backend
    // For now, just show a toast
  }, [toast, timelines])

  const assignUser = useCallback((
    serviceId: string,
    clientId: string,
    stageId: number,
    userId: string,
    role: 'admin' | 'manager' | 'tester' | 'client'
  ) => {
    toast({
      title: "User Assigned",
      description: `Assigned ${userId} to stage ${stageId}`,
    })
  }, [toast])

  const addComment = useCallback((
    serviceId: string,
    clientId: string,
    stageId: number,
    comment: string
  ) => {
    toast({
      title: "Comment Added",
      description: "Your comment has been added successfully",
    })
  }, [toast])

  const uploadAttachment = useCallback((
    serviceId: string,
    clientId: string,
    stageId: number,
    file: File
  ) => {
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully`,
    })
  }, [toast])

  const generateReport = useCallback((serviceId: string, clientId: string) => {
    toast({
      title: "Report Generated",
      description: "Report generation initiated. You will be notified when ready.",
    })
  }, [toast])

  const submitForReview = useCallback((serviceId: string, clientId: string, stageId: number) => {
    toast({
      title: "Submitted for Review",
      description: `Stage ${stageId} has been submitted for review`,
    })
  }, [toast])

  const approveStage = useCallback((serviceId: string, clientId: string, stageId: number) => {
    toast({
      title: "Stage Approved",
      description: `Stage ${stageId} has been approved`,
    })
  }, [toast])

  const rejectStage = useCallback((
    serviceId: string,
    clientId: string,
    stageId: number,
    reason: string
  ) => {
    toast({
      title: "Stage Rejected",
      description: `Stage ${stageId} has been rejected. ${reason}`,
      variant: "destructive"
    })
  }, [toast])

  const clientSatisfaction = useCallback((
    serviceId: string,
    clientId: string,
    satisfied: boolean,
    feedback?: string
  ) => {
    if (satisfied) {
      toast({
        title: "Client Satisfied",
        description: "Client marked service as satisfactory",
      })
    } else {
      toast({
        title: "Client Feedback Received",
        description: "Client feedback has been recorded. Service will be reassigned.",
        variant: "destructive"
      })
    }
  }, [toast])

  const reassignService = useCallback((
    serviceId: string, 
    clientId: string, 
    testerId: string,
    reason?: string
  ) => {
    toast({
      title: "Service Reassigned",
      description: `Service has been reassigned to ${testerId}. Workflow will continue from Task Assignment (Stage 4).`,
    })
    // In a real app, this would update the backend to:
    // - Set currentStageId to 4
    // - Assign the new tester
    // - Increment version number
    // - Reset stages 4-10
  }, [toast])

  return {
    // State
    state,
    clients: filteredClients,
    currentClientServices,
    currentTimeline,
    currentClientId: state.currentClientId,
    currentServiceId: state.currentServiceId,
    currentView: state.currentView,
    filters: state.filters,

    // Navigation
    navigateToClients,
    selectClient,
    selectService,

    // Filters
    updateFilters,

    // Actions
    updateStageStatus,
    assignUser,
    addComment,
    uploadAttachment,
    generateReport,
    submitForReview,
    approveStage,
    rejectStage,
    clientSatisfaction,
    reassignService
  }
}
