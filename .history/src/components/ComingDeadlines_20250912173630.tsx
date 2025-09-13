import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types"
const deadlines = [
  {
    id: 1,
    taskName: "Complete user testing",
    dueDate: "Dec 15, 2024",
    status: "Pending",
    priority: "High",
  },
  {
    id: 2,
    taskName: "Deploy to production",
    dueDate: "Dec 18, 2024",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 3,
    taskName: "Update documentation",
    dueDate: "Dec 20, 2024",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 4,
    taskName: "Code review session",
    dueDate: "Dec 22, 2024",
    status: "Done",
    priority: "Low",
  },
  {
    id: 5,
    taskName: "Client presentation",
    dueDate: "Dec 25, 2024",
    status: "Pending",
    priority: "High",
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

interface TaskProp {
  deadlines: Task[],
}
export default function ComingDeadlines({deadlines}: TaskProp) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Coming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-medium text-card-foreground">{deadline.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Due: {deadline.dueDate}</span>
                  <span className={getPriorityColor(deadline.priority)}>{deadline.priority} Priority</span>
                </div>
              </div>
              <Badge className={getStatusColor(deadline.status)}>{deadline.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
