"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Shield,
  DollarSign,
  Tag
} from "lucide-react"

interface AddLicenseDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (licenseData: any) => void
  existingLicenses?: any[]
  editingLicense?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddLicenseDrawer({
  isOpen,
  onClose,
  onSave,
  existingLicenses = [],
  editingLicense,
  isEditMode = false,
  isViewMode = false
}: AddLicenseDrawerProps) {
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
    } else {
      setFormData({
        licenseType: "",
        status: "active",
        version: "",
        contractValue: ""
      })
    }
  }, [editingLicense, isOpen])

  const handleSave = () => {
    const licenseData = {
      ...formData,
      contractValue: parseFloat(formData.contractValue) || 0
    }
    onSave(licenseData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      licenseType: "",
      status: "active",
      version: "",
      contractValue: ""
    })
    onClose()
  }

  const isFormValid = () => {
    return formData.licenseType && formData.status && formData.contractValue
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        className="w-[50vw] sm:w-[50vw] max-w-none flex flex-col p-0"
        style={{ width: '50vw', maxWidth: 'none' }}
      >
        <SheetHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            {isViewMode ? "View License" : isEditMode ? "Edit License" : "Add New License"}
          </SheetTitle>
          <SheetDescription>
            {isViewMode ? "View license details" : isEditMode ? "Update license information" : "Enter license master details"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
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
                  placeholder="Enter license type name"
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
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="e.g., 1.0.0"
                    readOnly={isViewMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractValue">Contract Value ($) *</Label>
                <Input
                  id="contractValue"
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                  placeholder="Enter contract value"
                  readOnly={isViewMode}
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
              {isEditMode ? "Update License" : "Add License"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
