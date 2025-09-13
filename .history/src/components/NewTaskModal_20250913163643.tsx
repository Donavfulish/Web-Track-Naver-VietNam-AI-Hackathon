import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ToastContainer, toast } from "react-toastify"
import TaskForm from "./TaskForm"
import { useTaskStore } from "@/store/taskStore"
import type { TaskStatus } from "@/types"

interface NewTaskModalProps {
  project_id: string
  isOpen: boolean
  onClose: () => void
}

export default function NewTaskModal({ project_id, isOpen, onClose }: NewTaskModalProps) {
  const addTask = useTaskStore((state) => state.addTask)
  const [formData, setFormData] = useState({
    project_id,
    title: "",
    description: "",
    deadline: "",
    priority: "",
    status: "Todo",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addTask({ ...formData, status: formData.status as TaskStatus })
      toast.success("Task created successfully!")
      setFormData({ project_id, title: "", description: "", deadline: "", priority: "", status: "Todo" })
      onClose()
    } catch {
      toast.error("Failed to create task. Please try again")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>

        <TaskForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Create Task" />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
