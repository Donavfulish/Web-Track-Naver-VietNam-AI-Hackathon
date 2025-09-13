import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import type { Task } from "@/types"
interface TaskListViewProps {
  tasks: Task[];
}

// Mock analytics data
const taskProgressData = [
  { week: "Week 1", completed: 3, pending: 5 },
  { week: "Week 2", completed: 6, pending: 4 },
  { week: "Week 3", completed: 8, pending: 3 },
  { week: "Week 4", completed: 12, pending: 2 },
]

const taskStatusData = [
  { name: "Completed", value: 60, color: "#10B981" },
  { name: "In Progress", value: 25, color: "#2563EB" },
  { name: "Pending", value: 15, color: "#FBBF24" },
]

const overdueData = [
  { week: "Week 1", overdue: 0 },
  { week: "Week 2", overdue: 1 },
  { week: "Week 3", overdue: 0 },
  { week: "Week 4", overdue: 2 },
]

export default function TaskAnalyticsView({ projectId }: TaskAnalyticsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Progress Chart */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#2563EB" name="Completed" />
              <Bar dataKey="pending" fill="#FBBF24" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Status Distribution */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overdue Tasks Trend */}
      <Card className="rounded-2xl shadow-md lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Overdue Tasks Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={overdueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="overdue"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
