"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  CreditCard,
  Building2,
  Users,
  Shield,
  Home,
  ChevronRight
} from "lucide-react"

interface ClientLicensesProps {
  onBack: () => void
}

const licenseData = {
  type: "Enterprise",
  status: "Active",
  startDate: "02/11/2024",
  renewalDate: "02/11/2026",
  contractValue: "$150,000",
  users: 50,
  features: [
    "Network Red Teaming",
    "Cloud Security Assessment",
    "Web Application Security",
    "External Attack Surface Monitor",
    "API Security Testing",
    "Phishing Simulation",
    "Server Hardening",
    "24/7 SOC Monitoring"
  ],
  supportLevel: "Premium 24/7",
  accountManager: "John Smith",
  companyName: "Tech Corp Solutions",
  industry: "Technology"
}

export default function ClientLicenses({ onBack }: ClientLicensesProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center text-sm text-gray-500">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Licenses</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-6 rounded-xl text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{licenseData.type} License</h1>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <span className="text-green-300 font-medium">{licenseData.status}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-100">Contract Value</div>
              <div className="text-3xl font-bold">{licenseData.contractValue}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Start Date</div>
                  <div className="font-semibold text-gray-800">{licenseData.startDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Renewal Date</div>
                  <div className="font-semibold text-gray-800">{licenseData.renewalDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Licensed Users</div>
                  <div className="font-semibold text-gray-800">{licenseData.users} users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Support Level</div>
                  <div className="font-semibold text-gray-800">{licenseData.supportLevel}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Licensed Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {licenseData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="h-5 w-5 text-cyan-600" />
                <div>
                  <div className="text-xs text-gray-500">Company Name</div>
                  <div className="font-medium text-gray-800">{licenseData.companyName}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-cyan-600" />
                <div>
                  <div className="text-xs text-gray-500">Industry</div>
                  <div className="font-medium text-gray-800">{licenseData.industry}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 text-cyan-600" />
                <div>
                  <div className="text-xs text-gray-500">Account Manager</div>
                  <div className="font-medium text-gray-800">{licenseData.accountManager}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">License History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">License renewed</span>
                </div>
                <span className="text-sm text-gray-500">02/11/2024</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm text-gray-700">Upgraded to Enterprise</span>
                </div>
                <span className="text-sm text-gray-500">02/11/2023</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">Initial license purchased (Professional)</span>
                </div>
                <span className="text-sm text-gray-500">02/11/2022</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-gray-100 border-t py-4 px-6 flex justify-between items-center text-sm text-gray-500">
        <span>Copyright. 2025. Necurity Solutions.</span>
        <span>Version 1.0.0</span>
      </footer>
    </div>
  )
}
