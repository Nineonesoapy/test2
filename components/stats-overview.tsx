import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, CheckCircle, Users } from "lucide-react"

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "In Progress",
    value: "8",
    change: "4 due this week",
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Completed",
    value: "24",
    change: "+6 this month",
    icon: CheckCircle,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Team Members",
    value: "16",
    change: "Across all projects",
    icon: Users,
    color: "text-orange-600 dark:text-orange-400",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-md bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
