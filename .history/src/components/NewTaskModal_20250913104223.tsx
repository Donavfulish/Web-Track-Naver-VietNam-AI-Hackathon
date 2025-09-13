import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Check } from "lucide-react"

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskData: any) => void
}

export default function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    status: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.description && formData.deadline && formData.priority && formData.status) {
      onSubmit(formData)
      setFormData({ title: "", description: "", deadline: "", priority: "", status: "" })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              className="border-gray-400 border-[1px]"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="border-gray-400 border-[1px] w-full resize-none break"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
              value={formData.deadline}
              onChange={(e) => handleChange("deadline", e.target.value)}
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <div className="border-gray-400 border-[1px] rounded-md">
            <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
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
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">Todo</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
