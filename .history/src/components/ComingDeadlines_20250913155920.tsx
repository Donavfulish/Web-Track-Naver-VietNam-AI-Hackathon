import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types"


const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-300 text-green-800"
    case "Miss":
      return "bg-red-300 text-red-900"
    case "Pending":
      return "bg-yellow-300 text-yellow-800"
    default:
      return "bg-blue-300 text-blue-800"
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
export default function ComingDeadlines({ deadlines }: TaskProp) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Coming Deadlines</CardTitle>
      </CardHeader>
      <>
        {if (!deadlines || deadlines.length === 0) {
    return <div>No deadlines yet 🎉</div> 
        else return {
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
                    <span>Due: {deadline.deadline}</span>
                    <span className={getPriorityColor(deadline.priority)}>{deadline.priority} Priority</span>
                  </div>
                </div>
                <Badge className={getStatusColor(deadline.status)}>{deadline.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
          }
        }}
      </>
    </Card>
  )
}
