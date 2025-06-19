import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Globe, Shield, Zap } from "lucide-react"

export function SiteCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SiteCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function SiteCreationLoading({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Creating Your Site</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Setting up DNS and SSL for your new website</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
              {subdomain}.sriox.com
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">DNS Configuration</span>
              <div className="flex-1 h-1 bg-green-200 dark:bg-green-800 rounded-full">
                <div className="h-1 bg-green-500 rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">SSL Certificate</span>
              <div className="flex-1 h-1 bg-yellow-200 dark:bg-yellow-800 rounded-full">
                <div className="h-1 bg-yellow-500 rounded-full animate-pulse" style={{ width: "75%" }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Server Setup</span>
              <div className="flex-1 h-1 bg-blue-200 dark:bg-blue-800 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full animate-pulse" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            This usually takes 30-60 seconds...
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
