"use client"

import { useMemo, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LifeBuoy, Plus, Upload, Download } from "lucide-react"
import { SummaryCards } from "@/components/client/support-tickets/components/SummaryCards"
import { SearchAndFilters } from "@/components/client/support-tickets/components/SearchAndFilters"
import { TicketTableView } from "@/components/client/support-tickets/components/TicketTableView"
import { TicketCardView } from "@/components/client/support-tickets/components/TicketCardView"
import { PaginationControls } from "@/components/client/support-tickets/components/PaginationControls"
import { AdvancedFilterSheet } from "@/components/client/support-tickets/components/AdvancedFilterSheet"
import AddTicketDrawer from "@/components/client/AddTicketDrawer"
import { Badge } from "@/components/ui/badge"

const mockTickets = [
  { id: "201", subject: "Onboard new client to support", category: "request", priority: "medium", status: "open", recipient: "Client", description: "Set up support portal", updatedAt: "2025-01-18T09:00:00Z", comments: 1 },
  { id: "202", subject: "Review escalated issue from ACME", category: "incident", priority: "high", status: "in_progress", recipient: "Manager", description: "SLA breach investigation", updatedAt: "2025-01-16T15:30:00Z", comments: 5 },
]

interface AdminSupportTicketsProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function AdminSupportTickets({ onNavigate }: AdminSupportTicketsProps = {}) {
  const [tickets, setTickets] = useState(mockTickets)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [recipientFilter, setRecipientFilter] = useState("all")
  const [updatedDateRange, setUpdatedDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" })
  const [sortBy, setSortBy] = useState("subject")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showAddDrawer, setShowAddDrawer] = useState(false)
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [editingTicket, setEditingTicket] = useState<any>(null)
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null)

  const filteredTickets = useMemo(() => {
    return tickets
      .filter(t => (statusFilter === "all" ? true : t.status === statusFilter))
      .filter(t => (priorityFilter === "all" ? true : t.priority === priorityFilter))
      .filter(t => (categoryFilter === "all" ? true : t.category === categoryFilter))
      .filter(t => (recipientFilter === "all" ? true : t.recipient === recipientFilter))
      .filter(t => {
        if (!updatedDateRange.start && !updatedDateRange.end) return true
        const ts = new Date(t.updatedAt).setHours(0,0,0,0)
        const startOk = updatedDateRange.start ? ts >= new Date(updatedDateRange.start).setHours(0,0,0,0) : true
        const endOk = updatedDateRange.end ? ts <= new Date(updatedDateRange.end).setHours(0,0,0,0) : true
        return startOk && endOk
      })
      .filter(t => (searchTerm ? (t.subject + t.category + t.recipient).toLowerCase().includes(searchTerm.toLowerCase()) : true))
  }, [tickets, statusFilter, priorityFilter, categoryFilter, recipientFilter, updatedDateRange, searchTerm])

  const sortedTickets = useMemo(() => {
    const sorted = [...filteredTickets]
    sorted.sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1
      if (sortBy === "updatedAt") return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir
      return String(a[sortBy as keyof typeof a]).localeCompare(String(b[sortBy as keyof typeof b])) * dir
    })
    return sorted
  }, [filteredTickets, sortBy, sortDirection])

  const totalItems = sortedTickets.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const paginatedTickets = sortedTickets.slice(startIndex, endIndex)

  const summaryStats = useMemo(() => ({
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    canceled: tickets.filter(t => t.status === 'canceled').length,
    total: tickets.length
  }), [tickets])

  const handleTableSort = (column: string) => {
    if (sortBy === column) setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    else { setSortBy(column); setSortDirection("asc") }
  }

  const getStatusBadge = (status: string) => {
    const map: Record<string, { className: string; label: string }> = {
      open: { className: "bg-red-100 text-red-700", label: "Open" },
      in_progress: { className: "bg-blue-100 text-blue-700", label: "In Progress" },
      completed: { className: "bg-emerald-100 text-emerald-700", label: "Completed" },
      on_hold: { className: "bg-yellow-100 text-yellow-700", label: "On Hold" },
      resolved: { className: "bg-green-100 text-green-700", label: "Resolved" },
      closed: { className: "bg-gray-100 text-gray-700", label: "Closed" },
      canceled: { className: "bg-slate-100 text-slate-700", label: "Canceled" },
    }
    const s = map[status] || map.open
    return <Badge className={`${s.className} hover:${s.className}`}>{s.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const map: Record<string, { className: string; label: string }> = {
      low: { className: "bg-gray-100 text-gray-700", label: "Low" },
      medium: { className: "bg-orange-100 text-orange-700", label: "Medium" },
      high: { className: "bg-red-100 text-red-700", label: "High" },
      critical: { className: "bg-rose-100 text-rose-700", label: "Critical" },
    }
    const p = map[priority] || map.medium
    return <Badge className={`${p.className} hover:${p.className}`}>{p.label}</Badge>
  }

  const handleAddTicket = (data: any) => {
    const newTicket = { id: String(200 + tickets.length + 1), updatedAt: new Date().toISOString(), comments: 0, status: "open", ...data }
    setTickets([newTicket, ...tickets])
  }

  const handleExportTickets = () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        tickets: tickets.map(t => ({
          id: t.id,
          subject: t.subject,
          category: t.category,
          priority: t.priority,
          status: t.status,
          recipient: t.recipient,
          description: t.description,
          updatedAt: t.updatedAt,
          comments: t.comments,
          services: (t as any).services || []
        }))
      }
      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `tickets_export_${new Date().toISOString().split('T')[0]}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('Export failed', e)
      alert('Export failed. Please try again.')
    }
  }

  const handleImportButtonClick = () => {
    const fileInput = importFileInput || document.querySelector('input[type="file"][accept=".json"][data-scope="tickets-admin"]') as HTMLInputElement
    if (fileInput) fileInput.click()
  }

  const handleImportTickets = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const importData = JSON.parse(text)
        const imported = importData.tickets || importData
        if (!Array.isArray(imported)) throw new Error('Invalid JSON format')
        const maxId = tickets.length > 0 ? Math.max(...tickets.map(t => parseInt(t.id) || 0)) : 0
        const normalized = imported.map((t: any, idx: number) => ({
          id: String(maxId + idx + 1),
          subject: t.subject || 'Imported Ticket',
          category: t.category || 'other',
          priority: t.priority || 'medium',
          status: t.status || 'open',
          recipient: t.recipient || 'Client',
          description: t.description || '',
          updatedAt: t.updatedAt || new Date().toISOString(),
          comments: t.comments ?? 0,
          services: Array.isArray(t.services) ? t.services : []
        }))
        setTickets(prev => [...normalized, ...prev])
        alert(`Imported ${normalized.length} ticket(s).`)
      } catch (err) {
        console.error('Import failed', err)
        alert('Import failed. Please check the file format.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleViewTicket = (t: any) => { setSelectedTicket(t); setEditingTicket(undefined); setShowAddDrawer(true) }
  const handleEditTicket = (t: any) => { setEditingTicket(t); setSelectedTicket(undefined); setShowAddDrawer(true) }

  const wrappedHandleViewTicket = useCallback((ticket: any) => {
    if (onNavigate) {
      onNavigate("add-ticket", { ticket, isEditMode: false, isViewMode: true })
    } else {
      handleViewTicket(ticket)
    }
  }, [onNavigate])

  const wrappedHandleEditTicket = useCallback((ticket: any) => {
    if (onNavigate) {
      onNavigate("add-ticket", { ticket, isEditMode: true, isViewMode: false })
    } else {
      handleEditTicket(ticket)
    }
  }, [onNavigate])
  const handleResolveTicket = (id: string) => setTickets(tickets.map(t => t.id === id ? { ...t, status: "resolved" } : t))
  const handleDeleteTicket = (t: any) => setTickets(tickets.filter(x => x.id !== t.id))

  const handleClearAdvancedFilters = () => { 
    setStatusFilter("all"); 
    setPriorityFilter("all");
    setCategoryFilter("all");
    setRecipientFilter("all");
    setUpdatedDateRange({ start: "", end: "" });
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <LifeBuoy className="h-7 w-7 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                <p className="text-gray-600 text-sm">Manage and track support tickets</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 border-gray-300 hover:bg-gray-50" onClick={handleImportButtonClick}>
                <Upload className="h-4 w-4 mr-2" />
                Import Ticket
              </Button>
              <Button variant="outline" size="sm" className="h-9 border-gray-300 hover:bg-gray-50" onClick={handleExportTickets}>
                <Download className="h-4 w-4 mr-2" />
                Export Ticket
              </Button>
              <Button size="sm" className="h-9 bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]" onClick={() => {
                if (onNavigate) {
                  onNavigate("add-ticket", { isEditMode: false, isViewMode: false })
                } else {
                  setSelectedTicket(undefined)
                  setEditingTicket(undefined)
                  setShowAddDrawer(true)
                }
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <input
        type="file"
        accept=".json"
        data-scope="tickets-admin"
        ref={(input) => setImportFileInput(input)}
        onChange={handleImportTickets}
        className="hidden"
        aria-label="Import tickets JSON file"
      />

      <SummaryCards summaryStats={summaryStats} />

      <Card>
        <CardContent className="px-4 pt-0 pb-0">
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

          {viewMode === "table" ? (
            <TicketTableView
              paginatedTickets={paginatedTickets}
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleTableSort={handleTableSort}
              handleViewTicket={wrappedHandleViewTicket}
              handleEditTicket={wrappedHandleEditTicket}
              handleResolveTicket={handleResolveTicket}
              handleDeleteTicket={handleDeleteTicket}
              getStatusBadge={getStatusBadge}
              getPriorityBadge={getPriorityBadge}
            />
          ) : (
            <TicketCardView
              paginatedTickets={paginatedTickets}
              handleViewTicket={wrappedHandleViewTicket}
              handleEditTicket={wrappedHandleEditTicket}
              handleResolveTicket={handleResolveTicket}
              handleDeleteTicket={handleDeleteTicket}
              getStatusBadge={getStatusBadge}
              getPriorityBadge={getPriorityBadge}
            />
          )}

          <PaginationControls
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>

      {!onNavigate && (
        <AddTicketDrawer
          isOpen={showAddDrawer}
          onClose={() => setShowAddDrawer(false)}
          onSave={handleAddTicket}
          defaultClient="ACME Corp"
          availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
          editingTicket={editingTicket || selectedTicket}
          isEditMode={!!editingTicket}
          isViewMode={!!selectedTicket && !editingTicket}
        />
      )}

      <AdvancedFilterSheet
        showAdvancedFilter={showAdvancedFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        recipientFilter={recipientFilter}
        setRecipientFilter={setRecipientFilter}
        updatedDateRange={updatedDateRange}
        setUpdatedDateRange={setUpdatedDateRange}
        handleClearAdvancedFilters={handleClearAdvancedFilters}
      />
    </div>
  )
}


