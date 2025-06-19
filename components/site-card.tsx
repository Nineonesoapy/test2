"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Settings, ExternalLink, FileText, Shield } from "lucide-react"

interface Site {
  subdomain: string
  status: "active" | "setting-up" | "error"
  files?: number
  lastUpdated?: string
}

interface SiteCardProps {
  site: Site
  onManage: (subdomain: string) => void
  onVisit: (subdomain: string) => void
}

const statusConfig = {
  active: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: Shield,
    text: "Live",
  },
  "setting-up": {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Settings,
    text: "Setting Up",
  },
  error: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: ExternalLink,
    text: "Error",
  },
}

export function SiteCard({ site, onManage, onVisit }: SiteCardProps) {
  const config = statusConfig[site.status]
  const StatusIcon = config.icon

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-slate-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {site.subdomain}.sriox.com
            </CardTitle>
          </div>
          <Badge className={`${config.color} border-0 font-medium flex items-center gap-1`}>
            <StatusIcon className="h-3 w-3" />
            {config.text}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{site.files || 1} files</span>
          </div>
          {site.lastUpdated && <span>Updated {site.lastUpdated}</span>}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onVisit(site.subdomain)}
            disabled={site.status !== "active"}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Visit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-slate-200 dark:border-slate-700"
            onClick={() => onManage(site.subdomain)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
