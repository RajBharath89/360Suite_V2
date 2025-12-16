"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Settings } from "lucide-react"

export default function BlankTemplate() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8">
          Start building your application from this clean template
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] hover:from-[#0a7c71] hover:to-[#0784a0]">
            <Plus className="h-5 w-5 mr-2" />
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            <FileText className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Users</CardTitle>
                <CardDescription>Manage your users</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Add user management functionality to your application.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Content</CardTitle>
                <CardDescription>Create and manage content</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Build content management features for your app.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Configure your application</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Add configuration and settings management.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Section */}
      <Card className="bg-gradient-to-r from-cyan-50 to-green-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="text-2xl">Ready to Build?</CardTitle>
          <CardDescription className="text-lg">
            This template includes all the UI components and styling you need to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">All UI components preserved</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Responsive design system</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Modern CSS and animations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Clean, minimal starting point</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
