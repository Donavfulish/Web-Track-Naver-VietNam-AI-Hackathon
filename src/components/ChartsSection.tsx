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
import type { Task } from "@/types";
import { getCompletionDate, getTaskStatusData, getDeadlineData } from "@/lib/chartUtils";
import { useMemo } from "react";

interface Tasks {
  tasks: Task[]
}

export default function ChartsSection({tasks}: Tasks) {

  const completionData = useMemo(() => getCompletionDate(tasks), [tasks])
  const taskStatusData = useMemo(() => getTaskStatusData(tasks), [tasks])
  const deadlineData = useMemo(() => getDeadlineData(tasks), [tasks])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Completion Rate Chart */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#2563EB" />
              <Bar dataKey="total" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Status Distribution */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Task Status Ratio</CardTitle>
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
              const percentage = tasks.length > 0 ? ((item.value / tasks.length) * 100).toFixed(1) : 0;
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

      {/* Remaining Deadlines */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Remaining Deadlines (In Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={deadlineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="remaining"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: "#2563EB", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
