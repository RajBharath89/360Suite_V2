"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  Key, 
  Mail, 
  Loader2,
  CheckCircle2,
  XCircle,
  User
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  name: string
  email: string
  phone: string
}

interface GenerateCredentialsDrawerProps {
  isOpen: boolean
  onClose: () => void
  client: {
    id: string
    companyName: string
    contacts: Contact[]
  } | null
}

export function GenerateCredentialsDrawer({
  isOpen,
  onClose,
  client
}: GenerateCredentialsDrawerProps) {
  const { toast } = useToast()
  const [mandatoryPasswordChange, setMandatoryPasswordChange] = useState(false)
  const [generatingStates, setGeneratingStates] = useState<Record<string, boolean>>({})
  const [generatedStates, setGeneratedStates] = useState<Record<string, boolean>>({})

  if (!client) return null

  const handleGenerateCredentials = async (contact: Contact) => {
    if (!contact.email) {
      toast({
        title: "Error",
        description: "Contact email is required",
        variant: "destructive"
      })
      return
    }

    // Set generating state for this contact
    setGeneratingStates(prev => ({ ...prev, [contact.email]: true }))
    setGeneratedStates(prev => ({ ...prev, [contact.email]: false }))

    try {
      // Simulate API call to generate credentials
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate credentials (in real implementation, this would be done on the backend)
      const username = contact.email.split('@')[0]
      const password = generateRandomPassword()

      // Simulate sending email (in real implementation, this would call an email service)
      console.log(`Generated credentials for ${contact.email}:`, {
        username,
        password,
        mandatoryPasswordChange,
        email: contact.email,
        name: contact.name
      })

      // Update state
      setGeneratingStates(prev => ({ ...prev, [contact.email]: false }))
      setGeneratedStates(prev => ({ ...prev, [contact.email]: true }))

      toast({
        title: "Success",
        description: `Credentials generated and sent to ${contact.email}`,
      })
    } catch (error) {
      setGeneratingStates(prev => ({ ...prev, [contact.email]: false }))
      toast({
        title: "Error",
        description: `Failed to generate credentials for ${contact.email}`,
        variant: "destructive"
      })
    }
  }

  const generateRandomPassword = (): string => {
    const length = 12
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password
  }

  const handleGenerateAll = async () => {
    const contactsWithEmails = client.contacts.filter(c => c.email)
    
    for (const contact of contactsWithEmails) {
      await handleGenerateCredentials(contact)
      // Small delay between emails
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  const resetStates = () => {
    setGeneratingStates({})
    setGeneratedStates({})
    setMandatoryPasswordChange(false)
  }

  const handleClose = () => {
    resetStates()
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        className="w-[50vw] sm:w-[50vw] max-w-none flex flex-col p-0"
        style={{ width: '50vw', maxWidth: 'none' }}
      >
        <SheetHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                <Key className="h-6 w-6 text-cyan-600" />
                Generate Credentials
              </SheetTitle>
              <SheetDescription>
                Generate and send login credentials for {client.companyName} contacts
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Mandatory Password Change Checkbox */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-cyan-600" />
                  Password Settings
                </CardTitle>
                <CardDescription>
                  Configure password requirements for generated credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mandatory-password-change"
                    checked={mandatoryPasswordChange}
                    onCheckedChange={(checked) => setMandatoryPasswordChange(checked === true)}
                  />
                  <Label
                    htmlFor="mandatory-password-change"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    First time mandatory password change
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  If enabled, users will be required to change their password upon first login
                </p>
              </CardContent>
            </Card>

            {/* Contact List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-600" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Select contacts to generate credentials for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.contacts.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    No contacts available for this client
                  </p>
                ) : (
                  <>
                    {client.contacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {contact.email || "No email provided"}
                            </div>
                            {contact.phone && (
                              <div className="text-xs text-gray-500 mt-1">{contact.phone}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {generatedStates[contact.email] && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          <Button
                            type="button"
                            onClick={() => handleGenerateCredentials(contact)}
                            disabled={!contact.email || generatingStates[contact.email]}
                            size="sm"
                            className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white hover:from-[#0a7c71] hover:to-[#0784a0]"
                          >
                            {generatingStates[contact.email] ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Key className="h-4 w-4 mr-2" />
                                Generate
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {client.contacts.some(c => c.email) && (
                      <div className="pt-4 border-t">
                        <Button
                          type="button"
                          onClick={handleGenerateAll}
                          disabled={Object.values(generatingStates).some(state => state)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Generate All Credentials
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <SheetFooter className="gap-2 px-6 pt-4 pb-6 flex-shrink-0 border-t bg-white">
          <Button variant="outline" onClick={handleClose} className="w-full">
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

