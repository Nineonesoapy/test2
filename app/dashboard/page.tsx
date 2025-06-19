"use client"

import { useState, useEffect } from "react"
import { SiteCard } from "@/components/site-card"
import { DashboardSkeleton } from "@/components/loading-states"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, LogOut, Globe } from "lucide-react"

// Mock data - replace with actual API calls
const mockSites = [
  { subdomain: "myportfolio", status: "active" as const, files: 5, lastUpdated: "2 hours ago" },
  { subdomain: "blog", status: "active" as const, files: 12, lastUpdated: "1 day ago" },
  { subdomain: "landing", status: "setting-up" as const, files: 1, lastUpdated: "Just now" },
]

export default function DashboardPage() {
  const [sites, setSites] = useState(mockSites)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleManage = (subdomain: string) => {
    window.location.href = `/manage/${subdomain}`
  }

  const handleVisit = (subdomain: string) => {
    window.open(`http://${subdomain}.sriox.com`, "_blank")
  }

  const filteredSites = sites.filter((site) => site.subdomain.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Your Websites
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage all your hosted websites in one place</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200 dark:border-slate-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search your websites..."
              className="pl-10 border-slate-200 dark:border-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            <a href="/create-site">Create New Site</a>
          </Button>
        </div>

        {/* Sites Grid */}
        {filteredSites.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site) => (
              <SiteCard key={site.subdomain} site={site} onManage={handleManage} onVisit={handleVisit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {searchTerm ? "No websites found" : "No websites yet"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Create your first website to get started"}
            </p>
            {!searchTerm && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                <a href="/create-site">Create Your First Site</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
