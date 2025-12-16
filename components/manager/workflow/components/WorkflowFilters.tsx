import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface WorkflowFiltersProps {
  filters: {
    status: string
    clientSatisfaction: string
    manager?: string
    tester?: string
  }
  onFilterChange: (filter: string, value: string) => void
  managers: string[]
  testers: string[]
}

export function WorkflowFilters({ filters, onFilterChange, managers, testers }: WorkflowFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.clientSatisfaction || 'all'} onValueChange={(value) => onFilterChange('clientSatisfaction', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Client Satisfaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="satisfied">Satisfied</SelectItem>
              <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.manager || 'all'} onValueChange={(value) => onFilterChange('manager', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Managers</SelectItem>
              {managers.map(manager => (
                <SelectItem key={manager} value={manager}>{manager}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.tester || 'all'} onValueChange={(value) => onFilterChange('tester', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Testers</SelectItem>
              {testers.map(tester => (
                <SelectItem key={tester} value={tester}>{tester}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
