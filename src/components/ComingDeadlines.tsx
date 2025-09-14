import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
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
  tasks: Task[],
}
export default function ComingDeadlines({ tasks }: TaskProp) {
  const navigate = useNavigate();
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Coming Deadlines</CardTitle>
      </CardHeader>
      {(!tasks || tasks.length === 0) ? (
        <div className="py-4 px-7 text-muted-foreground">No deadlines yet 🎉</div>
      ) : (
        <CardContent>
          <div className="space-y-4 ">
            {tasks.map((deadline) => {
              if (deadline.status !== 'Done') {
                const deadlineDate = new Date(deadline.deadline);
                const now = new Date();

                // Tính thời gian còn lại (ms)
                const diffMs = deadlineDate.getTime() - now.getTime();

                let warning = null;
                let noti = ""
                if (diffMs > 0) {
                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                  if (diffDays >= 1) {
                    noti = `❗ Deadline is in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
                  } else if (diffHours >= 1) {
                    noti = `❗ Deadline is in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
                  } else {
                    noti = `❗ Deadline is in ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
                  }

                  if (diffDays < 7) {
                    warning = (
                      <div className="flex items-center text-red-600 text-sm font-medium mt-1">
                        {noti}
                      </div>
                    );
                  }
                }

                return (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-md hover:bg-gray-300 transition cursor-pointer"
                    onClick={() => { navigate(`/projects/${deadline.project_id}`) }}
                  >
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-card-foreground">{deadline.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Due: {deadline.deadline}</span>
                        <span className={getPriorityColor(deadline.priority)}>
                          {deadline.priority} Priority
                        </span>
                        {warning}
                      </div>
                    </div>
                    <Badge className={getStatusColor(deadline.status)}>{deadline.status}</Badge>
                  </div>
                )
              }
            })}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
