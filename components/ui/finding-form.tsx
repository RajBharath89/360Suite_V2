"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, XCircle, Upload, X, Folder, File } from "lucide-react"

export interface PocFile {
  name: string
  type: "file" | "folder"
  size?: string
}

export interface FindingFormData {
  auditPeriod: string
  hostNames: string[]
  vulnerabilityName: string
  status: "Open" | "Inprogress" | "Closed"
  risk: "Critical" | "High" | "Medium" | "Low"
  cvssScore: number
  description: string
  stepsToReproduce: string[]
  impact: string
  recommendation: string
  pocFiles: PocFile[]
}

interface AuditPeriodOption {
  value: string
  label: string
}

interface FindingFormProps {
  formData: Partial<FindingFormData>
  setFormData: React.Dispatch<React.SetStateAction<Partial<FindingFormData>>>
  auditPeriodOptions: AuditPeriodOption[]
}

export function FindingForm({ formData, setFormData, auditPeriodOptions }: FindingFormProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleInputChange = React.useCallback((field: keyof FindingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [setFormData])

  const handleSelectChange = React.useCallback((field: keyof FindingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [setFormData])

  const addHostName = React.useCallback(() => {
    setFormData(prev => ({
      ...prev,
      hostNames: [...(prev.hostNames || []), ""]
    }))
  }, [setFormData])

  const updateHostName = React.useCallback((index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      hostNames: prev.hostNames?.map((h, i) => i === index ? value : h) || []
    }))
  }, [setFormData])

  const removeHostName = React.useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      hostNames: prev.hostNames?.filter((_, i) => i !== index) || []
    }))
  }, [setFormData])

  const addStep = React.useCallback(() => {
    setFormData(prev => ({
      ...prev,
      stepsToReproduce: [...(prev.stepsToReproduce || []), ""]
    }))
  }, [setFormData])

  const updateStep = React.useCallback((index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      stepsToReproduce: prev.stepsToReproduce?.map((s, i) => i === index ? value : s) || []
    }))
  }, [setFormData])

  const removeStep = React.useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      stepsToReproduce: prev.stepsToReproduce?.filter((_, i) => i !== index) || []
    }))
  }, [setFormData])

  const handleFileUpload = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: "file" as const,
        size: `${(file.size / 1024).toFixed(1)} KB`
      }))
      setFormData(prev => ({
        ...prev,
        pocFiles: [...(prev.pocFiles || []), ...newFiles]
      }))
    }
  }, [setFormData])

  const removePocFile = React.useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      pocFiles: prev.pocFiles?.filter((_, i) => i !== index) || []
    }))
  }, [setFormData])

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="auditPeriod">Audit Period *</Label>
          <Select value={formData.auditPeriod} onValueChange={(value) => handleSelectChange("auditPeriod", value)}>
            <SelectTrigger><SelectValue placeholder="Select audit period" /></SelectTrigger>
            <SelectContent>
              {auditPeriodOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>IP/Host Name *</Label>
          <Button type="button" variant="outline" size="sm" onClick={addHostName}>
            <Plus className="h-3 w-3 mr-1" />Add IP/Host
          </Button>
        </div>
        <div className="space-y-2">
          {formData.hostNames && formData.hostNames.length > 0 ? (
            formData.hostNames.map((host, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={host} 
                  onChange={(e) => updateHostName(index, e.target.value)} 
                  placeholder="e.g., 192.168.1.1(SERVER-01)" 
                />
                {formData.hostNames && formData.hostNames.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeHostName(index)} className="text-red-500 hover:text-red-700">
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="flex gap-2">
              <Input 
                value="" 
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    hostNames: [e.target.value]
                  }))
                }} 
                placeholder="e.g., 192.168.1.1(SERVER-01)" 
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vulnerabilityName">Vulnerability Name *</Label>
        <Input 
          id="vulnerabilityName" 
          placeholder="Enter vulnerability name" 
          value={formData.vulnerabilityName} 
          onChange={(e) => handleInputChange("vulnerabilityName", e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Inprogress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="risk">Risk Level</Label>
          <Select value={formData.risk} onValueChange={(value) => handleSelectChange("risk", value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvssScore">CVSS Score</Label>
          <Input 
            id="cvssScore" 
            type="number" 
            min="0" 
            max="10" 
            step="0.1" 
            value={formData.cvssScore} 
            onChange={(e) => handleInputChange("cvssScore", parseFloat(e.target.value) || 0)} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea 
          id="description" 
          placeholder="Describe the vulnerability..." 
          rows={3} 
          value={formData.description} 
          onChange={(e) => handleInputChange("description", e.target.value)} 
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Steps to Reproduce</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStep}>
            <Plus className="h-3 w-3 mr-1" />Add Step
          </Button>
        </div>
        <div className="space-y-2">
          {formData.stepsToReproduce?.map((step, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex-shrink-0 w-6 h-9 flex items-center justify-center text-sm text-gray-500">{index + 1}.</span>
              <Input 
                value={step} 
                onChange={(e) => updateStep(index, e.target.value)} 
                placeholder={`Step ${index + 1}`} 
              />
              {formData.stepsToReproduce && formData.stepsToReproduce.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeStep(index)} className="text-red-500 hover:text-red-700">
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="impact">Impact *</Label>
        <Textarea 
          id="impact" 
          placeholder="Describe the potential impact..." 
          rows={2} 
          value={formData.impact} 
          onChange={(e) => handleInputChange("impact", e.target.value)} 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recommendation">Fixing Recommendation *</Label>
        <Textarea 
          id="recommendation" 
          placeholder="Provide remediation steps..." 
          rows={2} 
          value={formData.recommendation} 
          onChange={(e) => handleInputChange("recommendation", e.target.value)} 
        />
      </div>

      <div className="space-y-2">
        <Label>POC Files/Folders</Label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500">Drag files here or click to upload</p>
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />Upload Files
            </Button>
          </div>
          {formData.pocFiles && formData.pocFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.pocFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    {file.type === "folder" ? <Folder className="h-4 w-4 text-amber-500" /> : <File className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm">{file.name}</span>
                    {file.size && <span className="text-xs text-gray-400">({file.size})</span>}
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removePocFile(index)} className="text-red-500 hover:text-red-700 h-6 w-6 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}