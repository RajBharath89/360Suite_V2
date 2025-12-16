"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BookOpen,
  Tag
} from "lucide-react"

interface AddServiceDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (serviceData: any) => void
  existingServices?: any[]
  editingService?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddServiceDrawer({
  isOpen,
  onClose,
  onSave,
  existingServices = [],
  editingService,
  isEditMode = false,
  isViewMode = false
}: AddServiceDrawerProps) {
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
    } else {
      setFormData({
        name: "",
        status: "active",
        category: "Technical",
        description: ""
      })
    }
  }, [editingService, isOpen])

  const handleSave = () => {
    onSave(formData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      status: "active",
      category: "Technical",
      description: ""
    })
    onClose()
  }

  const isFormValid = () => {
    return formData.name && formData.status && formData.category && formData.description
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        className="w-[50vw] sm:w-[50vw] max-w-none flex flex-col p-0"
        style={{ width: '50vw', maxWidth: 'none' }}
      >
        <SheetHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            {isViewMode ? "View Service" : isEditMode ? "Edit Service" : "Add New Service"}
          </SheetTitle>
          <SheetDescription>
            {isViewMode ? "View service details" : isEditMode ? "Update service information" : "Enter service master details"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter service description"
                  readOnly={isViewMode}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="gap-2 px-6 pt-4 pb-6 flex-shrink-0 border-t bg-white">
          <Button variant="outline" onClick={handleClose}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
          {!isViewMode && (
            <Button 
              onClick={handleSave}
              disabled={!isFormValid()}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isEditMode ? "Update Service" : "Add Service"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
