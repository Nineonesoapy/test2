import { DashboardSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg font-medium text-slate-600 dark:text-slate-300">Loading your projects...</span>
        </div>
        <DashboardSkeleton />
      </div>
    </div>
  )
}
