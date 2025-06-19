import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, GitBranch, ExternalLink } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "planning"
  progress: number
  dueDate: string
  teamSize: number
  technologies: string[]
}

interface ProjectCardProps {
  project: Project
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "on-hold": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  planning: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-slate-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.name}
          </CardTitle>
          <Badge className={`${statusColors[project.status]} border-0 font-medium`}>{project.status}</Badge>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Progress</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{project.dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.teamSize}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            >
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-slate-200 dark:border-slate-700">
            <GitBranch className="h-4 w-4 mr-1" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
