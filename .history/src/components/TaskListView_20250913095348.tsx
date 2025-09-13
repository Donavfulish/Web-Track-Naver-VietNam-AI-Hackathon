import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button';
import { Calendar, Flag } from "lucide-react"
import type { Task } from "@/types"
interface TaskListViewProps {
  tasks: Task[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-300 text-green-900"
    case "Miss":
      return "bg-red-300 text-red-900"
    case "Pending":
      return "bg-yellow-300 text-yellow-900"
    default:
      return "bg-blue-300 text-blue-900"
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

export default function TaskListView({ tasks }: TaskListViewProps) {
  console.log(tasks);
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
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => console.log(k)}
                  >
                    <Trash classname='w-1 h-1' />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => console.log(k)}
                  >
                    <Pencil classname='w-1 h-1' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
