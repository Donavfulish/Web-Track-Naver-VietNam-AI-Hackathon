import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Flag } from "lucide-react"
import type { Task } from "@/types"
interface TaskListViewProps {
  tasks: Task[];
}

// Mock task data
const tasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    description: "Create wireframes and high-fidelity mockups for the new homepage design",
    deadline: "2024-12-20",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Implement responsive navigation",
    description: "Build mobile-friendly navigation component with hamburger menu",
    deadline: "2024-12-22",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Set up analytics tracking",
    description: "Configure Google Analytics and custom event tracking",
    deadline: "2024-12-25",
    priority: "Low",
    status: "Pending",
  },
  {
    id: 4,
    title: "Content migration",
    description: "Transfer existing content to new CMS structure",
    deadline: "2024-12-18",
    priority: "High",
    status: "Done",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-600"
    case "Medium":
      return "text-yellow-600"
    case "Low":
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

export default function TaskListView({ projectId }: TaskListViewProps) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Project Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                      <span className={getPriorityColor(task.priority)}>{task.priority} Priority</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
