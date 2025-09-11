import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskCalendarViewProps {}

// Mock calendar data
const calendarTasks = [
  { date: "2024-12-18", tasks: [{ title: "Content migration", status: "Done" }] },
  { date: "2024-12-20", tasks: [{ title: "Design homepage mockup", status: "In Progress" }] },
  { date: "2024-12-22", tasks: [{ title: "Implement responsive navigation", status: "Pending" }] },
  { date: "2024-12-25", tasks: [{ title: "Set up analytics tracking", status: "Pending" }] },
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

export default function TaskCalendarView({ projectId }: TaskCalendarViewProps) {
  return (
export default function TaskCalendarView({}: TaskCalendarViewProps) {
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Task Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendarTasks.map((day) => (
            <div key={day.date} className="p-4 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-3">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <div className="space-y-2">
                {day.tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{task.title}</span>
                    <Badge className={getStatusColor(task.status)} size="sm">
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
