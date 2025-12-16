"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Filter, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

interface DashboardFiltersProps {
  dateRange: DateRange | undefined
  selectedClient: string
  selectedServiceType: string
  onDateRangeChange: (range: DateRange | undefined) => void
  onClientChange: (value: string) => void
  onServiceTypeChange: (value: string) => void
  onResetFilters: () => void
  clients: string[]
  serviceTypes: string[]
}

export function DashboardFilters({
  dateRange,
  selectedClient,
  selectedServiceType,
  onDateRangeChange,
  onClientChange,
  onServiceTypeChange,
  onResetFilters,
  clients,
  serviceTypes
}: DashboardFiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Select date range"
    }
    if (dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
    }
    return format(dateRange.from, "MMM d, yyyy")
  }

  return (
    <Card className="mb-6 shadow-sm border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Filter className="h-5 w-5 text-cyan-600" />
          Dashboard Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[280px] h-9 justify-start text-left font-normal border-gray-200 bg-white shadow-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                  <span className={dateRange?.from ? "text-gray-900" : "text-gray-500"}>
                    {formatDateRange()}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    onDateRangeChange(range)
                    if (range?.from && range?.to) {
                      setIsCalendarOpen(false)
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Client:</span>
            <Select value={selectedClient} onValueChange={onClientChange}>
              <SelectTrigger className="w-[180px] h-9 border-gray-200 bg-white shadow-sm">
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Service:</span>
            <Select value={selectedServiceType} onValueChange={onServiceTypeChange}>
              <SelectTrigger className="w-[180px] h-9 border-gray-200 bg-white shadow-sm">
                <SelectValue placeholder="All services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All services</SelectItem>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="ml-auto h-9 border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
