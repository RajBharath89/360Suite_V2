"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ExternalLink,
  Newspaper,
  GripVertical
} from "lucide-react"

interface NewsItem {
  id: number
  title: string
  url: string
}

const defaultNewsItems: NewsItem[] = [
  { id: 1, title: "India orders smartphone makers to preload state-owned cyber safety app. 02 Dec, 25", url: "https://example.com/news/1" },
  { id: 2, title: "India's telecoms ministry has privately asked smartphone makers to preload all the security applications", url: "https://example.com/news/2" },
  { id: 3, title: "New ransomware group targets healthcare sector with sophisticated attacks", url: "https://example.com/news/3" },
]

export default function AdminNewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState({ title: "", url: "" })

  useEffect(() => {
    const stored = localStorage.getItem('newsFeeds')
    if (stored) {
      try {
        setNewsItems(JSON.parse(stored))
      } catch (e) {
        console.error('Error parsing news feeds')
      }
    }
  }, [])

  const saveToStorage = (items: NewsItem[]) => {
    localStorage.setItem('newsFeeds', JSON.stringify(items))
    setNewsItems(items)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({ title: "", url: "" })
    setIsDialogOpen(true)
  }

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item)
    setFormData({ title: item.title, url: item.url })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    const updated = newsItems.filter(item => item.id !== id)
    saveToStorage(updated)
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.url.trim()) return

    if (editingItem) {
      const updated = newsItems.map(item =>
        item.id === editingItem.id
          ? { ...item, title: formData.title, url: formData.url }
          : item
      )
      saveToStorage(updated)
    } else {
      const newItem: NewsItem = {
        id: Date.now(),
        title: formData.title,
        url: formData.url
      }
      saveToStorage([...newsItems, newItem])
    }

    setIsDialogOpen(false)
    setFormData({ title: "", url: "" })
    setEditingItem(null)
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
          <CardContent className="p-3 h-full">
            <div className="flex justify-between items-center h-full">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                  <Newspaper className="h-7 w-7 text-cyan-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">News Feed Management</h1>
                  <p className="text-gray-600 text-sm">Manage cyber trend news items displayed in the client dashboard ticker</p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" className="h-9 bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]" onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add News Item
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a new news item to the ticker</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-cyan-600" />
              Active News Items
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({newsItems.length} items)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {newsItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Newspaper className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>No news items added yet.</p>
                <p className="text-sm">Click "Add News Item" to get started.</p>
              </div>
            ) : (
              <div className="divide-y">
                {newsItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="p-4 hover:bg-gray-50 flex items-start gap-4"
                  >
                    <div className="text-gray-300 cursor-move">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded font-medium">
                          #{index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 text-sm">{item.title}</h3>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-600 hover:underline flex items-center gap-1 mt-1"
                          >
                            {item.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            className="p-2 rounded hover:bg-gray-200 transition-colors"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit2 className="h-4 w-4 text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit news item</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            className="p-2 rounded hover:bg-red-100 transition-colors"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete news item</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Preview</h3>
                <p className="text-sm text-gray-600 mt-1">
                  News items will appear in the scrolling ticker at the top of the client dashboard. 
                  Clicking on any news item will redirect users to the specified URL.
                </p>
                <div className="mt-3 bg-[#0891b2] text-white py-2 px-4 rounded-lg text-sm overflow-hidden">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#065f73] px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                      Cyber Trends
                    </span>
                    <div className="overflow-hidden">
                      <span className="whitespace-nowrap">
                        {newsItems.map((item, i) => (
                          <span key={item.id}>
                            {item.title} {i < newsItems.length - 1 ? '• ' : ''}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit News Item" : "Add News Item"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">News Title</Label>
                <Input
                  id="title"
                  placeholder="Enter news headline..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  This will be displayed in the scrolling ticker
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">External URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/news-article"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Users will be redirected to this URL when clicking the news item
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-cyan-600 hover:bg-cyan-700"
                onClick={handleSave}
                disabled={!formData.title.trim() || !formData.url.trim()}
              >
                {editingItem ? "Save Changes" : "Add News Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
