"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Shield,
  DollarSign,
  Tag,
  ArrowLeft,
  Save,
  X,
  Home,
  ChevronRight
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddLicensePageProps {
  onBack: () => void
  onSave: (licenseData: any) => void
  editingLicense?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddLicensePage({
  onBack,
  onSave,
  editingLicense,
  isEditMode = false,
  isViewMode = false
}: AddLicensePageProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    licenseType: "",
    status: "active",
    version: "",
    contractValue: ""
  })

  useEffect(() => {
    if (editingLicense) {
      setFormData({
        licenseType: editingLicense.licenseType || "",
        status: editingLicense.status || "active",
        version: editingLicense.version || "",
        contractValue: editingLicense.contractValue?.toString() || ""
      })
    }
  }, [editingLicense])

  const handleSave = () => {
    const licenseData = {
      ...formData,
      contractValue: parseFloat(formData.contractValue) || 0
    }
    onSave(licenseData)
    toast({
      title: isEditMode ? "License Updated" : "License Added",
      description: `${formData.licenseType} license has been ${isEditMode ? "updated" : "created"} successfully.`,
      duration: 3000,
    })
    onBack()
  }

  const isFormValid = () => {
    return formData.licenseType && formData.status && formData.contractValue
  }

  const getTitle = () => {
    if (isViewMode) return "View License"
    if (isEditMode) return "Edit License"
    return "Add New License"
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
              Licenses
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
                {isEditMode ? "Update" : "Save"} License
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {isViewMode ? "View License" : isEditMode ? "Edit License" : "Add New License"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isViewMode ? "View license details" : isEditMode ? "Update license information" : "Enter license master details"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-600" />
                License Information
              </CardTitle>
              <CardDescription>Master license details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">License Type *</Label>
                <Input
                  id="licenseType"
                  value={formData.licenseType}
                  onChange={(e) => setFormData({...formData, licenseType: e.target.value})}
                  placeholder="Enter license type (e.g., Standard, Professional, Enterprise)"
                  readOnly={isViewMode}
                />
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
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="Enter version (e.g., 1.0, 2.0)"
                  readOnly={isViewMode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractValue">Contract Value *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="contractValue"
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                    placeholder="Enter contract value"
                    className="pl-10"
                    readOnly={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
