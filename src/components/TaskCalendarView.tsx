import { useState } from "react"
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  parseISO,
  isSameDay,
} from "date-fns"
import type { Task } from "@/types"

const statusColors: Record<string, string> = {
  Todo: "bg-blue-300 text-green-900",
  Done: "bg-green-300 text-green-900",
  Pending: "bg-yellow-300 text-yellow-900",
  Miss: "bg-red-300 text-red-900",
}

interface TaskCalendarViewProps {
  tasks: Task[]
}

export default function TaskCalendarView({ tasks }: TaskCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 text-lg rounded bg-gray-200 hover:bg-gray-300"
        >
          ← Prev
        </button>
        <h2 className="font-semibold text-xl">{format(currentDate, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 text-lg rounded bg-gray-200 hover:bg-gray-300"
        >
          Next →
        </button>
      </div>

      {/* Weekdays row */}
      <div className="grid grid-cols-7 text-center font-medium text-sm">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const dayTasks = tasks.filter((t) => {
            if (!t.deadline) return false
            try {
              const taskDate = parseISO(t.deadline)
              return isSameDay(taskDate, day)
            } catch {
              return false
            }
          })

          return (
            <div
              key={idx}
              className={`border rounded p-1 min-h-[100px] flex flex-col ${
                !isSameMonth(day, currentDate) ? "bg-gray-50 text-gray-400" : ""
              } ${isToday(day) ? "border-blue-500" : ""}`}
            >
              <div className="text-xs font-semibold">{format(day, "d")}</div>
              <div className="space-y-1 mt-1">
                {dayTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`text-xs truncate rounded px-1 py-0.5 cursor-pointer hover:opacity-80 ${
                      statusColors[t.status] || "bg-gray-100"
                    }`}
                  >
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
