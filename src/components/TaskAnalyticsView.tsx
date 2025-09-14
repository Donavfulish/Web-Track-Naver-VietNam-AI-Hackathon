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
import type { Task, Project } from "@/types"
import { getTaskProgressData, getDeadlineData } from "@/lib/chartUtils"
import { useMemo } from "react"

interface TaskAnalyticsViewProps {
  tasks: Task[];
  projectById?: Project; // nếu cần thì thêm project
}

export default function TaskAnalyticsView({ tasks, projectById }: TaskAnalyticsViewProps) {
  const taskProgressData = useMemo(() => {
    if (!projectById) return [];
    return getTaskProgressData(tasks, projectById);
  }, [tasks, projectById]);

  const taskStatusData = [
    { name: "Completed", value: projectById?.num_done, color: "#10B981" },
    { name: "In Progress", value: (projectById?.num_pending ?? 0) + (projectById?.num_to_do ?? 0), color: "#2563EB" },
    { name: "Miss", value: projectById?.num_miss, color: "#FE2020" },
  ]
  const taskRemainingData = useMemo(() => getDeadlineData(tasks), [tasks])
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
              <Bar dataKey="miss" fill="#FE2020" name="Miss" />
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
            {taskStatusData.map((item) => {
              const percentage = tasks.length > 0 ? (((item?.value?? 0) / tasks.length) * 100).toFixed(1) : 0;
              return (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{percentage}%</span>
              </div>
            )})}
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
            <LineChart data={taskRemainingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="remaining"
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
