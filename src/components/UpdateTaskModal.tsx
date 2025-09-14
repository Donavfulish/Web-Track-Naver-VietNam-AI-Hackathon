import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ToastContainer} from "react-toastify"
import TaskForm from "./TaskForm"
import { useTaskStore } from "@/store/taskStore"
import type { Task, TaskStatus } from "@/types"

interface UpdateTaskModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
}

export default function UpdateTaskModal({ task, isOpen, onClose }: UpdateTaskModalProps) {
  const updateTask = useTaskStore((state) => state.updateTask)
  const [formData, setFormData] = useState(task)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const today = new Date().toISOString().split("T")[0]
    try {
      await updateTask(task.id, { ...formData, status: formData.status as TaskStatus, completed_date: formData.status === 'Done' ? today : null })
      onClose()
    } catch (err) {
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Task</DialogTitle>
        </DialogHeader>
        <TaskForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Update Task" />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
