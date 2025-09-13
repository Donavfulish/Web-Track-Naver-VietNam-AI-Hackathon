import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { Task } from "@/types"

interface TaskFormProps {
  formData: Partial<Task>
  onChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  submitLabel: string
}

export default function TaskForm({ formData, onChange, onSubmit, submitLabel }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          className="border-gray-400 border-[1px]"
          value={formData.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="border-gray-400 border-[1px] resize-none break-words w-full max-w-100 overflow-y-auto"
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the task"
          rows={3}
        />
      </div>

      {/* Deadline */}
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          className="border-gray-400 border-[1px]"
          type="date"
          value={formData.deadline || ""}
          onChange={(e) => onChange("deadline", e.target.value)}
          required
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <div className="border-gray-400 border-[1px] rounded-md">
          <Select value={formData.priority || ""} onValueChange={(value) => onChange("priority", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <div className="border-gray-400 border-[1px] rounded-md">
          <Select value={formData.status || "Todo"} onValueChange={(value) => onChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Miss">Miss</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Check className="h-4 w-4 mr-2" />
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
