"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BookOpen,
  Tag,
  ArrowLeft,
  Save,
  X,
  Home,
  ChevronRight
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddServicePageProps {
  onBack: () => void
  onSave: (serviceData: any) => void
  editingService?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddServicePage({
  onBack,
  onSave,
  editingService,
  isEditMode = false,
  isViewMode = false
}: AddServicePageProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    category: "Technical",
    description: ""
  })

  useEffect(() => {
    if (editingService) {
      setFormData({
        name: editingService.name || "",
        status: editingService.status || "active",
        category: editingService.category || "Technical",
        description: editingService.description || ""
      })
    }
  }, [editingService])

  const handleSave = () => {
    onSave(formData)
    toast({
      title: isEditMode ? "Service Updated" : "Service Added",
      description: `${formData.name} has been ${isEditMode ? "updated" : "created"} successfully.`,
      duration: 3000,
    })
    onBack()
  }

  const isFormValid = () => {
    return formData.name && formData.status && formData.category && formData.description
  }

  const getTitle = () => {
    if (isViewMode) return "View Service"
    if (isEditMode) return "Edit Service"
    return "Add New Service"
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <button 
              onClick={onBack} 
              className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <button 
              onClick={onBack} 
              className="hover:text-cyan-600 transition-colors"
            >
              Services
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{getTitle()}</span>
          </div>
          {!isViewMode && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={onBack}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={!isFormValid()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? "Update" : "Save"} Service
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {isViewMode ? "View Service" : isEditMode ? "Edit Service" : "Add New Service"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isViewMode ? "View service details" : isEditMode ? "Update service information" : "Enter service master details"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-600" />
                Service Information
              </CardTitle>
              <CardDescription>Master service details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter service name"
                  readOnly={isViewMode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter service description"
                  rows={4}
                  readOnly={isViewMode}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
